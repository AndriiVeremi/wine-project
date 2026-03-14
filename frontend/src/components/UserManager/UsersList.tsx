import { useState, useEffect, useCallback } from 'react';
import { getAllUsers, toggleUserBan, deleteUser } from '@/api/adminApi';
import { FiUsers, FiSlash, FiCheckCircle } from 'react-icons/fi';
import { useDebounce } from '@/hooks/useDebounce';
import TableManager, { type Column } from '@/components/common/TableManager/TableManager';
import { ItemImg, ManagerWrapper } from '@/components/common/TableManager/TableManager.styled';
import toast from 'react-hot-toast';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isBanned: boolean;
  avatarUrl?: string;
}

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const q = useDebounce(search, 500);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllUsers({ limit: 10, page, search: q });
      setUsers(res.data.users);
      setTotal(res.data.totalCount);
      setPages(res.data.totalPages);
    } catch {
      toast.error('Could not load users');
    } finally {
      setLoading(false);
    }
  }, [page, q]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleBan = async (id: string) => {
    try {
      await toggleUserBan(id);
      toast.success('User status updated');
      loadData();
    } catch {
      toast.error('Error updating status');
    }
  };

  const handleRemove = async (id: string) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await deleteUser(id);
      toast.success('User removed');
      loadData();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const cols: Column<User>[] = [
    {
      header: 'Photo',
      render: (u) => <ItemImg src={u.avatarUrl || '/assets/user-placeholder.png'} />,
    },
    {
      header: 'Full Name',
      render: (u) => `${u.firstName} ${u.lastName}`,
    },
    {
      header: 'Email',
      render: (u) => u.email,
    },
    {
      header: 'Role',
      render: (u) => <span style={{ fontSize: '12px' }}>{u.role}</span>,
    },
    {
      header: 'Status',
      render: (u) => (
        <button
          onClick={() => handleBan(u._id)}
          style={{
            background: u.isBanned ? '#ff4d4f' : '#52c41a',
            border: 'none',
            padding: '4px 10px',
            borderRadius: '6px',
            cursor: 'pointer',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          {u.isBanned ? <FiSlash /> : <FiCheckCircle />}
          {u.isBanned ? 'BANNED' : 'ACTIVE'}
        </button>
      ),
    },
  ];

  return (
    <ManagerWrapper>
      <TableManager
        title="Users"
        data={users}
        columns={cols}
        loading={loading}
        total={total}
        totalPages={pages}
        page={page}
        search={search}
        onSearch={setSearch}
        onPage={setPage}
        onRemove={handleRemove}
        getId={(u) => u._id}
        emptyIcon={<FiUsers />}
        emptyTitle="No users"
        emptyText="System users will appear here."
      />
    </ManagerWrapper>
  );
};

export default UsersList;
