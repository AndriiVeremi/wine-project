import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites, useFavoriteMutations } from '@/hooks/queries/useFavorites';
import { FiHeart } from 'react-icons/fi';
import TableManager, { type Column } from '@/components/Common/TableManager/TableManager';
import { ItemImg } from '@/components/Common/TableManager/TableManager.styled';
import type { Wine } from '@/types/wine';

const UserWishList = () => {
  const { data: favorites = [], isLoading } = useFavorites();
  const { toggleFavorite } = useFavoriteMutations();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;
  const navigate = useNavigate();

  const filtered = favorites.filter(
    (w) =>
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.winery?.name.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / limit) || 1;
  const pagedItems = filtered.slice((page - 1) * limit, page * limit);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const columns: Column<Wine>[] = [
    {
      header: 'Image',
      render: (w) => (
        <ItemImg
          src={w.imageUrl}
          onClick={() => navigate(`/wines/${w._id || (w as { id?: string }).id}`)}
          style={{ cursor: 'pointer' }}
        />
      ),
    },
    {
      header: 'Wine Name',
      render: (w) => (
        <span
          onClick={() => navigate(`/wines/${w._id || (w as { id?: string }).id}`)}
          style={{ cursor: 'pointer', fontWeight: 500 }}
        >
          {w.name}
        </span>
      ),
    },
    {
      header: 'Winery',
      render: (w) => w.winery?.name || '---',
    },
    {
      header: 'Details',
      render: (w) => (
        <span style={{ fontSize: '13px', color: '#666', textTransform: 'capitalize' }}>
          {w.color} - {w.sweetness}
        </span>
      ),
    },
  ];

  return (
    <TableManager
      title="My Wishlist"
      data={pagedItems}
      columns={columns}
      loading={isLoading}
      total={filtered.length}
      totalPages={totalPages}
      page={page}
      search={search}
      onSearch={setSearch}
      onPage={setPage}
      onRemove={(id) => {
        toggleFavorite({ wineId: id, isFavorite: true });
      }}
      getId={(w) => w._id || (w as { id?: string }).id || ''}
      emptyIcon={<FiHeart />}
      emptyTitle="Your wishlist is empty"
      emptyText="Save some wines to see them here."
    />
  );
};

export default UserWishList;
