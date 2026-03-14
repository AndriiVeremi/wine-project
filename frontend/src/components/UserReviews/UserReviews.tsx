import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMessageSquare, FiStar } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getUserReviews, deleteReview } from '@/api/reviews';
import type { Review } from '@/types/wine';
import TableManager, { type Column } from '@/components/common/TableManager/TableManager';
import { ItemImg } from '@/components/common/TableManager/TableManager.styled';

const AccountReviews = () => {
  const [items, setItems] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getUserReviews(page);
      setItems(data.reviews);
      setTotalPages(data.totalPages);
      setTotalCount(data.total);
    } catch {
      toast.error('Could not load reviews');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRemove = async (id: string) => {
    if (!window.confirm('Delete this review?')) return;

    const review = items.find((r) => r._id === id);
    if (!review) return;

    const wineId =
      typeof review.wineId === 'object' ? (review.wineId as { _id: string })._id : review.wineId;

    try {
      await deleteReview(wineId, id);
      toast.success('Deleted');
      loadData();
    } catch {
      toast.error('Error deleting');
    }
  };

  const columns: Column<Review>[] = [
    {
      header: 'Wine',
      render: (r) => {
        const wine = r.wineId as unknown as { _id: string; name: string; imageUrl: string };
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ItemImg
              src={wine?.imageUrl}
              onClick={() => navigate(`/wines/${wine?._id}`)}
              style={{ width: '35px', height: '35px', cursor: 'pointer' }}
            />
            <span
              onClick={() => navigate(`/wines/${wine?._id}`)}
              style={{ cursor: 'pointer', fontWeight: 500 }}
            >
              {wine?.name || 'Unknown'}
            </span>
          </div>
        );
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
      render: (r) => (
        <div
          style={{
            maxWidth: '200px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: '13px',
          }}
        >
          {r.comment}
        </div>
      ),
    },
    {
      header: 'Date',
      render: (r) => new Date(r.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <TableManager
      title="My Reviews"
      data={items}
      columns={columns}
      loading={loading}
      total={totalCount}
      totalPages={totalPages}
      page={page}
      search=""
      onSearch={() => {}}
      onPage={setPage}
      onRemove={onRemove}
      getId={(r) => r._id}
      emptyIcon={<FiMessageSquare />}
      emptyTitle="No reviews yet"
      emptyText="Your reviews will appear here once you write them."
    />
  );
};

export default AccountReviews;
