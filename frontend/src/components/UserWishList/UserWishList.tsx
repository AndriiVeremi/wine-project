import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavoritesStore } from '@/store/user/useFavoritesStore';
import { FiHeart } from 'react-icons/fi';
import MainButton from '@/components/buttons/MainButton';
import { Loader } from '@/components/common/Loader';
import FavoriteButton from '@/components/buttons/FavoriteButton';
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
  const { favorites, isLoading, fetchFavorites } = useFavoritesStore();
  const navigate = useNavigate();

  useEffect(() => {
    // If favorites are empty, try to fetch them from server
    // (though they might be pre-loaded by SharedLayout or similar)
    if (favorites.length === 0) {
      fetchFavorites();
    }
  }, [fetchFavorites, favorites.length]);

  if (isLoading && favorites.length === 0) return <Loader />;

  return (
    <WishlistContainer>
      {favorites.length === 0 ? (
        <EmptyMessage>
          <FiHeart size={80} />
          <h3>Your wishlist is empty</h3>
          <p>You haven't saved any wines yet. Explore our collection!</p>
          <MainButton onClick={() => navigate('/wines')}>Explore Wines</MainButton>
        </EmptyMessage>
      ) : (
        <WineGrid>
          {favorites.map((item) => (
            <WineCard key={item.id}>
              <RemoveButton>
                <FavoriteButton wine={item} size={32} />
              </RemoveButton>
              <WineImage
                src={item.imageUrl}
                alt={item.name}
                onClick={() => navigate(`/wines/${item.id}`)}
                style={{ cursor: 'pointer' }}
              />
              <WineName onClick={() => navigate(`/wines/${item.id}`)} style={{ cursor: 'pointer' }}>
                {item.name}
              </WineName>
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
