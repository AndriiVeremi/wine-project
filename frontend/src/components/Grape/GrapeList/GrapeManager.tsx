import { useState, useEffect } from 'react';
import { useProfile } from '@/hooks/queries/useAuth';
import { FaLeaf } from 'react-icons/fa';
import MainButton from '@/components/Buttons/MainButton';
import AddGrape from '@/components/Forms/AddGrapeForm/AddGrapeForm';
import { useDebounce } from '@/hooks/useDebounce';
import { useGrapes, useGrapeMutations } from '@/hooks/queries/useGrapes';
import type { Grape } from '@/types/grape';
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

const GrapeManager = ({ wineryId }: Props) => {
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const [editingGrape, setEditingGrape] = useState<Grape | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useGrapes({
    limit: 10,
    page,
    search: debouncedSearch,
    wineryId,
  });

  const { deleteGrape } = useGrapeMutations();

  const { data: profile } = useProfile();
  const isAdmin = profile?.role === 'ADMIN';

  const grapes = data?.data?.grapes || [];
  const totalCount = data?.data?.totalCount || 0;
  const totalPages = data?.data?.totalPages || 1;

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, wineryId]);

  if (!isAdmin && !wineryId) {
    return (
      <ManagerWrapper>
        <SectionTitle>My Grapes</SectionTitle>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <FaLeaf size={50} style={{ color: 'var(--tertiary-gray)', marginBottom: '20px' }} />
          <p style={{ color: 'var(--secondary-gray)', fontSize: '18px' }}>
            To manage grapes, please first create your winery in the "My Winery" section.
          </p>
        </div>
      </ManagerWrapper>
    );
  }

  const handleEdit = (item: Grape) => {
    setEditingGrape(item);
    setView('edit');
  };

  const handleRemove = async (id: string) => {
    if (window.confirm('Delete?')) {
      await deleteGrape(id);
    }
  };

  const columns: Column<Grape>[] = [
    {
      header: 'Photo',
      render: (g) => <ItemImg src={g.imageUrls?.[0] || '/assets/grape-placeholder.png'} />,
    },
    {
      header: 'Name',
      render: (g) => g.name,
    },
    {
      header: 'Type',
      render: (g) => <span style={{ textTransform: 'capitalize' }}>{g.type}</span>,
    },
    {
      header: 'Notes',
      render: (g) => g.characteristics?.slice(0, 2).join(', ') || 'N/A',
    },
  ];

  if (view !== 'list') {
    return (
      <ManagerWrapper>
        <Header>
          <SectionTitle>{view === 'add' ? 'Add Grape' : 'Edit Grape'}</SectionTitle>
          <MainButton type="button" onClick={() => setView('list')}>
            BACK
          </MainButton>
        </Header>
        <AddGrape
          wineryId={wineryId}
          grapeData={editingGrape}
          onSuccess={() => {
            setView('list');
          }}
        />
      </ManagerWrapper>
    );
  }

  return (
    <TableManager
      title={isAdmin ? 'All Grapes' : 'My Grapes'}
      data={grapes}
      columns={columns}
      loading={isLoading}
      total={totalCount}
      totalPages={totalPages}
      page={page}
      search={search}
      onSearch={setSearch}
      onPage={setPage}
      onAdd={() => {
        setEditingGrape(null);
        setView('add');
      }}
      onEdit={handleEdit}
      onRemove={handleRemove}
      getId={(g) => g._id}
      emptyIcon={<FaLeaf />}
      emptyTitle="No grapes"
      emptyText="Add your first grape variety."
    />
  );
};

export default GrapeManager;
