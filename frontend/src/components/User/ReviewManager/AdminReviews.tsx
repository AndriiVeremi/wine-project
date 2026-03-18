import { useState, useEffect, useCallback } from 'react';
import { getAllReviews, deleteReview } from '@/api/adminApi';
import { FiMessageSquare, FiStar, FiFilter } from 'react-icons/fi';
import TableManager, { type Column } from '@/components/Common/TableManager/TableManager';
import { ItemImg, ManagerWrapper } from '@/components/Common/TableManager/TableManager.styled';
import toast from 'react-hot-toast';
import styled from 'styled-components';

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

const SortSelect = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--white);
  border: 1px solid var(--tertiary-gray);
  padding: 0 12px;
  border-radius: 12px;
  height: 48px;
  transition: var(--transition);

  &:focus-within {
    border-color: var(--primary-wine);
  }

  select {
    border: none;
    outline: none;
    background: transparent;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    color: var(--primary-gray);
  }

  svg {
    color: var(--primary-wine);
  }
`;

const TypeBadge = styled.span<{ $type: string }>`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  background: ${({ $type }) =>
    $type === 'wine' ? '#e3f2fd' : $type === 'winery' ? '#f3e5f5' : '#e8f5e9'};
  color: ${({ $type }) =>
    $type === 'wine' ? '#1976d2' : $type === 'winery' ? '#7b1fa2' : '#388e3c'};
`;

const AdminReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [selectedType, setSelectedType] = useState('all');

  const loadReviews = useCallback(async () => {
    setLoading(true);
    try {
      const typeParam = selectedType === 'all' ? undefined : selectedType;
      const res = await getAllReviews({ limit: 10, page, type: typeParam });
      setReviews(res.data.reviews);
      setTotal(res.data.total);
      setPages(res.data.totalPages);
    } catch {
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  }, [page, selectedType]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  useEffect(() => {
    setPage(1);
  }, [selectedType]);

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
      header: 'Type',
      render: (r) => {
        const type = r.wineId ? 'wine' : r.wineryId ? 'winery' : 'tour';
        return <TypeBadge $type={type}>{type}</TypeBadge>;
      },
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
        title="User Reviews"
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
        emptyText="No user reviews found for this category."
        extraHeaderContent={
          <SortSelect>
            <FiFilter />
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
              <option value="all">All Types</option>
              <option value="wine">Wines</option>
              <option value="winery">Wineries</option>
              <option value="tour">Tours</option>
            </select>
          </SortSelect>
        }
      />
    </ManagerWrapper>
  );
};

export default AdminReviews;
