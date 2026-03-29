import { useState } from 'react';
import { FiHome, FiStar } from 'react-icons/fi';
import { useDebounce } from '@/hooks/useDebounce';
import type { Winery } from '@/types/wineries';
import { useWineries, useWineryMutations } from '@/hooks/queries/useWineries';
import TableManager, { type Column } from '@/components/Common/TableManager/TableManager';
import {
  ItemImg,
  ManagerWrapper,
  Header,
} from '@/components/Common/TableManager/TableManager.styled';
import { SectionTitle } from '@/pages/AccountPage/AccountPage.styled';
import MainButton from '@/components/Buttons/MainButton';
import AddWinery from '@/components/Forms/AddWineryForm/AddWineryForm';

const AdminWineries = () => {
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const [editingWinery, setEditingWinery] = useState<Winery | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const q = useDebounce(search, 500);

  const { data, isLoading } = useWineries({ limit: 10, page, search: q });
  const { deleteWinery, toggleVip } = useWineryMutations();

  const items = data?.data?.wineries || [];
  const total = data?.data?.totalCount || 0;
  const pages = data?.data?.totalPages || 1;

  const handleEdit = (winery: Winery) => {
    setEditingWinery(winery);
    setView('edit');
  };

  const onRemove = async (id: string) => {
    if (!window.confirm('Delete this winery?')) return;
    await deleteWinery(id);
  };

  const onVip = async (id: string) => {
    await toggleVip(id);
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

  if (view !== 'list') {
    return (
      <ManagerWrapper>
        <Header>
          <SectionTitle>{view === 'add' ? 'New Winery' : 'Edit Winery'}</SectionTitle>
          <MainButton type="button" onClick={() => setView('list')}>
            BACK
          </MainButton>
        </Header>
        <AddWinery
          wineryData={editingWinery}
          onSuccess={() => {
            setView('list');
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
      loading={isLoading}
      total={total}
      totalPages={pages}
      page={page}
      search={search}
      onSearch={setSearch}
      onPage={setPage}
      onAdd={() => {
        setEditingWinery(null);
        setView('add');
      }}
      onEdit={handleEdit}
      onRemove={onRemove}
      getId={(w) => w._id}
      emptyIcon={<FiHome />}
      emptyTitle="No wineries"
      emptyText="No wineries registered yet."
    />
  );
};

export default AdminWineries;
