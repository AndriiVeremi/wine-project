import { useState, useEffect, useCallback } from 'react';
import { getWineries, deleteWinery, toggleWineryVip } from '@/api/wineries';
import { FiHome, FiStar } from 'react-icons/fi';
import { useDebounce } from '@/hooks/useDebounce';
import type { Winery } from '@/types/wineries';
import TableManager, { type Column } from '@/components/common/TableManager/TableManager';
import {
  ItemImg,
  ManagerWrapper,
  Header,
} from '@/components/common/TableManager/TableManager.styled';
import { SectionTitle } from '@/pages/AccountPage/AccountPage.styled';
import MainButton from '@/components/buttons/MainButton';
import AddWinery from '@/components/forms/AddWineryForm/AddWineryForm';
import toast from 'react-hot-toast';

const AdminWineries = () => {
  const [view, setView] = useState<'list' | 'add'>('list');
  const [items, setItems] = useState<Winery[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const q = useDebounce(search, 500);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getWineries({ limit: 10, page, search: q });
      setItems(res.data.wineries);
      setTotal(res.data.totalCount);
      setPages(res.data.totalPages);
    } catch {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [page, q]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRemove = async (id: string) => {
    if (!window.confirm('Delete this winery?')) return;
    try {
      await deleteWinery(id);
      toast.success('Deleted');
      loadData();
    } catch {
      toast.error('Error');
    }
  };

  const onVip = async (id: string) => {
    try {
      await toggleWineryVip(id);
      toast.success('VIP status updated');
      loadData();
    } catch {
      toast.error('Failed');
    }
  };

  const cols: Column<Winery>[] = [
    {
      header: 'Logo',
      render: (w) => <ItemImg src={w.logoUrl || '/assets/winery-placeholder.png'} />,
    },
    {
      header: 'Name',
      render: (w) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {w.name}
          {w.isVip && <FiStar style={{ color: '#d4af37', fill: '#d4af37' }} />}
        </div>
      ),
    },
    {
      header: 'Location',
      render: (w) => {
        const c = w.country as unknown as { name: string };
        const r = w.region as unknown as { name: string };
        return `${c?.name || ''}, ${r?.name || ''}`;
      },
    },
    {
      header: 'Email',
      render: (w) => w.contactEmail,
    },
    {
      header: 'VIP',
      render: (w) => (
        <button
          onClick={() => onVip(w._id)}
          style={{
            background: w.isVip ? '#d4af37' : '#eee',
            border: 'none',
            padding: '4px 8px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
            color: w.isVip ? '#fff' : '#333',
          }}
        >
          {w.isVip ? 'REVOKE VIP' : 'GIVE VIP'}
        </button>
      ),
    },
  ];

  if (view === 'add') {
    return (
      <ManagerWrapper>
        <Header>
          <SectionTitle>New Winery</SectionTitle>
          <MainButton type="button" onClick={() => setView('list')}>
            BACK
          </MainButton>
        </Header>
        <AddWinery
          onSuccess={() => {
            setView('list');
            loadData();
          }}
        />
      </ManagerWrapper>
    );
  }

  return (
    <TableManager
      title="Wineries"
      data={items}
      columns={cols}
      loading={loading}
      total={total}
      totalPages={pages}
      page={page}
      search={search}
      onSearch={setSearch}
      onPage={setPage}
      onAdd={() => setView('add')}
      onRemove={onRemove}
      getId={(w) => w._id}
      emptyIcon={<FiHome />}
      emptyTitle="No wineries"
      emptyText="No wineries registered yet."
    />
  );
};

export default AdminWineries;
