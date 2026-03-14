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

    let targetId = '';
    let type: 'wine' | 'winery' | 'tour' = 'wine';

    if (review.wineId) {
      targetId = typeof review.wineId === 'object' ? review.wineId._id : review.wineId;
      type = 'wine';
    } else if (review.wineryId) {
      targetId = typeof review.wineryId === 'object' ? review.wineryId._id : review.wineryId;
      type = 'winery';
    } else if (review.tourId) {
      targetId = typeof review.tourId === 'object' ? review.tourId._id : review.tourId;
      type = 'tour';
    }

    if (!targetId) return;

    try {
      await deleteReview(targetId, id, type);
      toast.success('Deleted');
      loadData();
    } catch {
      toast.error('Error deleting');
    }
  };

  const columns: Column<Review>[] = [
    {
      header: 'Item',
      render: (r) => {
        let name = 'Unknown';
        let imgUrl = '';
        let path = '';

        if (r.wineId && typeof r.wineId === 'object') {
          name = r.wineId.name;
          imgUrl = r.wineId.imageUrl;
          path = `/wines/${r.wineId._id}`;
        } else if (r.wineryId && typeof r.wineryId === 'object') {
          name = r.wineryId.name;
          imgUrl = r.wineryId.logoUrl || '';
          path = `/wineries/${r.wineryId._id}`;
        } else if (r.tourId && typeof r.tourId === 'object') {
          name = r.tourId.name;
          path = `/tours/${r.tourId._id}`;
        }

        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {imgUrl && (
              <ItemImg
                src={imgUrl}
                onClick={() => navigate(path)}
                style={{ width: '35px', height: '35px', cursor: 'pointer' }}
              />
            )}
            <span onClick={() => navigate(path)} style={{ cursor: 'pointer', fontWeight: 500 }}>
              {name}
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
