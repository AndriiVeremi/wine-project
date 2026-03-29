import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth/authStore';
import { FiMap } from 'react-icons/fi';
import MainButton from '@/components/Buttons/MainButton';
import AddTour from '@/components/Forms/AddTourForm/AddTourForm';
import { useDebounce } from '@/hooks/useDebounce';
import { useTours, useTourMutations } from '@/hooks/queries/useTours';
import type { Tour } from '@/types/tours';
import TableManager, { type Column } from '@/components/Common/TableManager/TableManager';
import {
  ItemImg,
  ManagerWrapper,
  Header,
} from '@/components/Common/TableManager/TableManager.styled';
import { SectionTitle } from '@/pages/AccountPage/AccountPage.styled';

interface Props {
  wineryId?: string;
}

const TourManager = ({ wineryId }: Props) => {
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 500);

  const { data: toursData, isLoading } = useTours({
    limit: 10,
    page,
    wineryId,
    name: debouncedSearch,
  });

  const { deleteTour } = useTourMutations();

  const { profile } = useAuthStore();
  const isAdmin = profile?.role === 'ADMIN';

  const tours = toursData?.data?.tours || [];
  const total = toursData?.data?.totalCount || 0;
  const totalPages = toursData?.data?.totalPages || 1;

  useEffect(() => {
    setPage(1);
  }, [wineryId, debouncedSearch]);

  if (!isAdmin && !wineryId) {
    return (
      <ManagerWrapper>
        <SectionTitle>My Tours</SectionTitle>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <FiMap size={50} style={{ color: 'var(--tertiary-gray)', marginBottom: '20px' }} />
          <p style={{ color: 'var(--secondary-gray)', fontSize: '18px' }}>
            To manage tours, please first create your winery in the "My Winery" section.
          </p>
        </div>
      </ManagerWrapper>
    );
  }

  const handleEdit = (item: Tour) => {
    setEditingTour(item);
    setView('edit');
  };

  const handleRemove = async (id: string) => {
    if (window.confirm('Delete?')) {
      await deleteTour(id);
    }
  };

  const columns: Column<Tour>[] = [
    {
      header: 'Photo',
      render: (tour) => <ItemImg src={tour.images?.[0] || '/assets/tour-placeholder.png'} />,
    },
    {
      header: 'Name',
      render: (tour) => tour.name,
    },
    {
      header: 'Price',
      render: (tour) => `₾${tour.price}`,
    },
    {
      header: 'Duration',
      render: (tour) => `${tour.duration} min`,
    },
  ];

  if (view !== 'list') {
    return (
      <ManagerWrapper>
        <Header>
          <SectionTitle>{view === 'add' ? 'Add Tour' : 'Edit Tour'}</SectionTitle>
          <MainButton type="button" onClick={() => setView('list')}>
            BACK
          </MainButton>
        </Header>
        <AddTour
          wineryId={wineryId}
          tourData={editingTour}
          onSuccess={() => {
            setView('list');
          }}
        />
      </ManagerWrapper>
    );
  }

  return (
    <TableManager
      title={isAdmin ? 'All Tours' : 'My Tours'}
      data={tours}
      columns={columns}
      loading={isLoading}
      total={total}
      totalPages={totalPages}
      page={page}
      search={search}
      onSearch={setSearch}
      onPage={setPage}
      onAdd={() => {
        setEditingTour(null);
        setView('add');
      }}
      onEdit={handleEdit}
      onRemove={handleRemove}
      getId={(t) => t._id}
      emptyIcon={<FiMap />}
      emptyTitle="No tours"
      emptyText="Add your first tour."
    />
  );
};

export default TourManager;
