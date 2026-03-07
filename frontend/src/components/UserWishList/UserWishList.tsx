import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserFavorites, removeWineFromFavorites } from '@/api/userApi';
import type { WishlistWine } from '@/types/wine';
import { FiHeart } from 'react-icons/fi';
import toast from 'react-hot-toast';
import MainButton from '@/components/buttons/MainButton';
import { Loader } from '@/components/common/Loader';
import { getErrorMsg } from '@/api/helpers';
import {
  WishlistContainer,
  WineGrid,
  WineCard,
  WineImage,
  WineName,
  WineryName,
  RemoveButton,
  EmptyMessage,
} from './UserWishList.styled';

const Wishlist: React.FC = () => {
  const [list, setList] = useState<WishlistWine[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const { data } = await getUserFavorites();
      setList(data);
    } catch (err) {
      toast.error(getErrorMsg(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onDelete = async (id: string) => {
    try {
      await removeWineFromFavorites(id);
      setList(list.filter((item) => item.id !== id));
      toast.success('Removed!');
    } catch (err) {
      toast.error(getErrorMsg(err));
    }
  };

  if (loading) return <Loader />;

  return (
    <WishlistContainer>
      {list.length === 0 ? (
        <EmptyMessage>
          <FiHeart size={80} />
          <h3>Your wishlist is empty</h3>
          <p>You haven't saved any wines yet. Explore our collection!</p>
          <MainButton onClick={() => navigate('/wines')}>Explore Wines</MainButton>
        </EmptyMessage>
      ) : (
        <WineGrid>
          {list.map((item) => (
            <WineCard key={item.id}>
              <RemoveButton onClick={() => onDelete(item.id)}>
                <FiHeart style={{ fill: '#ff4d4f' }} />
              </RemoveButton>
              <WineImage src={item.imageUrl} alt={item.name} />
              <WineName>{item.name}</WineName>
              {item.winery && <WineryName>{item.winery.name}</WineryName>}
              <p style={{ fontSize: '14px', color: '#888' }}>
                {item.color} - {item.sweetness}
              </p>
            </WineCard>
          ))}
        </WineGrid>
      )}
    </WishlistContainer>
  );
};

export default Wishlist;
