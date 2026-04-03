import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { StyledFavoriteButton } from './FavoriteButton.styled';
import { useFavorites, useFavoriteMutations } from '@/hooks/queries/useFavorites';
import type { Wine } from '@/types/wine';
import { useAuthStore } from '@/store/auth/authStore';

interface Props {
  wine: Wine;
  className?: string;
  style?: React.CSSProperties;
  size?: number;
  color?: string;
}

const FavoriteButton = ({ wine, className, style, size = 24, color = '#841013' }: Props) => {
  const { data: favorites = [] } = useFavorites();
  const { toggleFavorite } = useFavoriteMutations();

  const isFavorite = favorites.some((f) => (f._id || (f as { id?: string }).id) === wine._id);
  const user = useAuthStore((s) => s.user);
  const openAuthModal = useAuthStore((s) => s.openAuthModal);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (user) {
      toggleFavorite({ wineId: wine._id, isFavorite });
    } else {
      openAuthModal('login');
    }
  };

  return (
    <StyledFavoriteButton
      className={className}
      style={style}
      onClick={handleToggle}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? (
        <FaHeart size={size} color={color} />
      ) : (
        <FaRegHeart size={size} color={color} />
      )}
    </StyledFavoriteButton>
  );
};

export default FavoriteButton;
