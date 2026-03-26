import { useState, useEffect } from 'react';
import { useWinesStore } from '@/store/wine/winesStore';
import { useAuthStore } from '@/store/auth/authStore';
import { FaWineBottle } from 'react-icons/fa';
import MainButton from '@/components/Buttons/MainButton';
import AddWine from '@/components/Forms/AddWinesForm/AddWinesForm';
import { useDebounce } from '@/hooks/useDebounce';
import type { Wine } from '@/types/wine';
import TableManager, { type Column } from '@/components/Common/TableManager/TableManager';
import {
  ItemImg,
  ManagerWrapper,
  Header,
} from '@/components/Common/TableManager/TableManager.styled';
import { SectionTitle } from '@/pages/AccountPage/AccountPage.styled';
import toast from 'react-hot-toast';

interface Props {
  wineryId?: string;
}

const WineManager = ({ wineryId }: Props) => {
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const [activeWine, setActiveWine] = useState<Wine | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const findText = useDebounce(search, 500);

  const { wines, fetch, remove, loading, totalPages, total } = useWinesStore();
  const { user, profile } = useAuthStore();
  const isAdmin = profile?.role === 'ADMIN';

  useEffect(() => {
    if (user?.uid && (wineryId || isAdmin)) {
      fetch({ limit: 10, page, wineryId, name: findText });
    } else if (user?.uid && !isAdmin && !wineryId) {
      useWinesStore.setState({ wines: [], total: 0, totalPages: 0 });
    }
  }, [user?.uid, page, wineryId, findText, fetch, isAdmin]);

  useEffect(() => {
    setPage(1);
  }, [findText, wineryId]);

  if (!isAdmin && !wineryId) {
    return (
      <ManagerWrapper>
        <SectionTitle>My Wines</SectionTitle>
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <FaWineBottle size={60} style={{ color: '#e0e0e0', marginBottom: '20px' }} />
          <p style={{ color: '#888', fontSize: '18px', maxWidth: '400px', margin: '0 auto' }}>
            First, create your winery in the "My Winery" section to manage your wine collection.
          </p>
        </div>
      </ManagerWrapper>
    );
  }

  const goEdit = (item: Wine) => {
    setActiveWine(item);
    setView('edit');
  };

  const killWine = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this wine?')) return;
    try {
      await remove(id);
      toast.success('Wine deleted');

      if (wines.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        fetch({ limit: 10, page, wineryId, name: findText });
      }
    } catch {
      toast.error('Failed to delete');
    }
  };

  const cols: Column<Wine>[] = [
    {
      header: 'Photo',
      render: (w) => <ItemImg src={w.imageUrl || '/assets/wine-placeholder.png'} alt={w.name} />,
    },
    { header: 'Wine Name', render: (w) => <span style={{ fontWeight: 600 }}>{w.name}</span> },
    { header: 'Winery', render: (w) => w.winery?.name },
    { header: 'Region', render: (w) => w.winery?.region?.name || 'N/A' },
    { header: 'Grape', render: (w) => w.grape?.name || 'N/A' },
    { header: 'Year', render: (w) => w.vintage },
    {
      header: 'Price',
      render: (w) => <span style={{ color: '#b22222', fontWeight: 700 }}>${w.price}</span>,
    },
  ];

  if (view !== 'list') {
    return (
      <ManagerWrapper>
        <Header>
          <SectionTitle>{view === 'add' ? 'Add New Wine' : 'Edit Wine Details'}</SectionTitle>
          <MainButton type="button" onClick={() => setView('list')}>
            BACK TO LIST
          </MainButton>
        </Header>
        <AddWine
          wineryId={wineryId}
          wineData={activeWine}
          onSuccess={() => {
            setView('list');
            fetch({ limit: 10, page, wineryId, name: findText });
          }}
        />
      </ManagerWrapper>
    );
  }

  return (
    <TableManager
      title={isAdmin ? 'Global Wine Database' : 'My Wine Production'}
      data={wines}
      columns={cols}
      loading={loading}
      total={total}
      totalPages={totalPages}
      page={page}
      search={search}
      onSearch={setSearch}
      onPage={setPage}
      onAdd={() => {
        setActiveWine(null);
        setView('add');
      }}
      onEdit={goEdit}
      onRemove={killWine}
      getId={(w) => w._id}
      emptyIcon={<FaWineBottle />}
      emptyTitle="No wines found"
      emptyText="Start adding your premium wines to the list."
    />
  );
};

export default WineManager;
