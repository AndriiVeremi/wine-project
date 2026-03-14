import { useState, useEffect } from 'react';
import { useWinesStore } from '@/store/wine/winesStore';
import { useAuthStore } from '@/store/auth/authStore';
import { FaWineBottle } from 'react-icons/fa';
import MainButton from '@/components/buttons/MainButton';
import AddWine from '@/components/forms/AddWinesForm/AddWinesForm';
import { useDebounce } from '@/hooks/useDebounce';
import type { Wine } from '@/types/wine';
import TableManager, { type Column } from '@/components/common/TableManager/EntityManager';
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

const WineManager = ({ wineryId }: Props) => {
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const [editingWine, setEditingWine] = useState<Wine | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 500);

  const { wines, fetch, remove, loading, totalPages, total } = useWinesStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user?.uid && wineryId) {
      fetch({ limit: 10, page, wineryId, name: debouncedSearch });
    }
  }, [user?.uid, page, wineryId, debouncedSearch, fetch]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, wineryId]);

  const handleEdit = (item: Wine) => {
    setEditingWine(item);
    setView('edit');
  };

  const handleRemove = async (id: string) => {
    if (!window.confirm('Delete wine?')) return;
    try {
      await remove(id);
      toast.success('Removed');

      const isLastOnPage = wines.length === 1 && page > 1;
      const nextPage = isLastOnPage ? page - 1 : page;

      if (isLastOnPage) setPage(nextPage);
      else fetch({ limit: 10, page: nextPage, wineryId, name: debouncedSearch });
    } catch {
      toast.error('Error');
    }
  };

  const columns: Column<Wine>[] = [
    {
      header: 'Photo',
      render: (w) => <ItemImg src={w.imageUrl || '/assets/wine-placeholder.png'} />,
    },
    { header: 'Name', render: (w) => w.name },
    { header: 'Year', render: (w) => w.vintage },
    { header: 'Price', render: (w) => `$${w.price}` },
  ];

  if (view !== 'list') {
    return (
      <ManagerWrapper>
        <Header>
          <SectionTitle>{view === 'add' ? 'Add Wine' : 'Edit Wine'}</SectionTitle>
          <MainButton type="button" onClick={() => setView('list')}>
            BACK
          </MainButton>
        </Header>
        <AddWine
          wineryId={wineryId}
          wineData={editingWine}
          onSuccess={() => {
            setView('list');
            fetch({ limit: 10, page, wineryId, name: debouncedSearch });
          }}
        />
      </ManagerWrapper>
    );
  }

  return (
    <TableManager
      title="My Wines"
      data={wines}
      columns={columns}
      loading={loading}
      total={total}
      totalPages={totalPages}
      page={page}
      search={search}
      onSearch={setSearch}
      onPage={setPage}
      onAdd={() => {
        setEditingWine(null);
        setView('add');
      }}
      onEdit={handleEdit}
      onRemove={handleRemove}
      getId={(w) => w._id}
      emptyIcon={<FaWineBottle />}
      emptyTitle="No wines"
      emptyText="Add your first wine production."
    />
  );
};

export default WineManager;
