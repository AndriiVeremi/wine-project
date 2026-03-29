import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { StyledFavoriteButton } from './FavoriteButton.styled';
import { useFavoritesStore } from '@/store/user/useFavoritesStore';
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
  const isFavorite = useFavoritesStore((s) => s.isFavorite(wine._id));
  const user = useAuthStore((s) => s.user);
  const openAuthModal = useAuthStore((s) => s.openAuthModal);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (user) {
      toggleFavorite(wine);
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
