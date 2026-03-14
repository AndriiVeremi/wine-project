import { useState, useEffect, useCallback } from 'react';
import { getAllReviews, deleteReview } from '@/api/adminApi';
import { FiMessageSquare, FiStar } from 'react-icons/fi';
import TableManager, { type Column } from '@/components/common/TableManager/TableManager';
import { ItemImg, ManagerWrapper } from '@/components/common/TableManager/TableManager.styled';
import toast from 'react-hot-toast';

interface Review {
  _id: string;
  rating: number;
  comment: string;
  userId: { firstName: string; lastName: string; avatarUrl?: string };
  wineId?: { name: string; imageUrl?: string };
  wineryId?: { name: string; logoUrl?: string };
  tourId?: { name: string };
  createdAt: string;
}

const AdminReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);

  const loadReviews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllReviews({ limit: 10, page });
      setReviews(res.data.reviews);
      setTotal(res.data.total);
      setPages(res.data.totalPages);
    } catch {
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const onRemove = async (id: string) => {
    if (!window.confirm('Delete this review?')) return;
    try {
      await deleteReview(id);
      toast.success('Removed');
      loadReviews();
    } catch {
      toast.error('Failed to remove');
    }
  };

  const cols: Column<Review>[] = [
    {
      header: 'Author',
      render: (r) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ItemImg
            src={r.userId?.avatarUrl || '/assets/user-placeholder.png'}
            style={{ width: '30px', height: '30px' }}
          />
          <span>
            {r.userId?.firstName} {r.userId?.lastName}
          </span>
        </div>
      ),
    },
    {
      header: 'Item',
      render: (r) => {
        if (r.wineId) return r.wineId.name;
        if (r.wineryId) return r.wineryId.name;
        if (r.tourId) return r.tourId.name;
        return 'Unknown';
      },
    },
    {
      header: 'Rating',
      render: (r) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {r.rating} <FiStar style={{ color: '#faad14', fill: '#faad14' }} />
        </div>
      ),
    },
    {
      header: 'Comment',
      render: (r) => <div style={{ maxWidth: '300px', fontSize: '13px' }}>{r.comment}</div>,
    },
    {
      header: 'Date',
      render: (r) => new Date(r.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <ManagerWrapper>
      <TableManager
        title="All Reviews"
        data={reviews}
        columns={cols}
        loading={loading}
        total={total}
        totalPages={pages}
        page={page}
        search=""
        onSearch={() => {}}
        onPage={setPage}
        onRemove={onRemove}
        getId={(r) => r._id}
        emptyIcon={<FiMessageSquare />}
        emptyTitle="No reviews"
        emptyText="No user reviews found."
      />
    </ManagerWrapper>
  );
};

export default AdminReviews;
