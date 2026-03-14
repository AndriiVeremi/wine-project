import { useState, useEffect } from 'react';
import { useGrapesStore } from '@/store/grape/grapesStore';
import { useAuthStore } from '@/store/auth/authStore';
import { FaLeaf } from 'react-icons/fa';
import MainButton from '@/components/buttons/MainButton';
import AddGrape from '@/components/forms/AddGrapeForm/AddGrapeForm';
import { useDebounce } from '@/hooks/useDebounce';
import type { Grape } from '@/types/grape';
import TableManager, { type Column } from '@/components/common/TableManager/TableManager';
import {
  ItemImg,
  ManagerWrapper,
  Header,
} from '@/components/common/TableManager/TableManager.styled';
import { SectionTitle } from '@/pages/AccountPage/AccountPage.styled';
import toast from 'react-hot-toast';

interface Props {
  wineryId?: string;
}

const GrapeManager = ({ wineryId }: Props) => {
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const [editingGrape, setEditingGrape] = useState<Grape | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 500);

  const { grapes, fetchGrapes, removeGrape, loading, totalPages, totalCount } = useGrapesStore();
  const { user, profile } = useAuthStore();
  const isAdmin = profile?.role === 'ADMIN';

  useEffect(() => {
    if (user?.uid && (wineryId || isAdmin)) {
      fetchGrapes({
        limit: 10,
        page: page,
        search: debouncedSearch,
        wineryId,
      });
    }
  }, [user?.uid, page, debouncedSearch, fetchGrapes, wineryId, isAdmin]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, wineryId]);

  const handleEdit = (item: Grape) => {
    setEditingGrape(item);
    setView('edit');
  };

  const handleRemove = async (id: string) => {
    if (window.confirm('Delete?')) {
      try {
        await removeGrape(id);
        toast.success('Deleted');
        fetchGrapes({ limit: 10, page, search: debouncedSearch, wineryId });
      } catch {
        toast.error('Failed');
      }
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
            fetchGrapes({ limit: 10, page, search: debouncedSearch, wineryId });
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
      loading={loading}
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
      onEdit={isAdmin ? undefined : handleEdit}
      onRemove={handleRemove}
      getId={(g) => g._id}
      emptyIcon={<FaLeaf />}
      emptyTitle="No grapes"
      emptyText="Add your first grape variety."
    />
  );
};

export default GrapeManager;
