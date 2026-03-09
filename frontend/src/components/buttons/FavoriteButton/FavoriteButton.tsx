import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { StyledFavoriteButton } from './FavoriteButton.styled';
import { useFavoritesStore } from '@/store/user/useFavoritesStore';

interface Props {
  wineId: string;
  className?: string;
  style?: React.CSSProperties;
  size?: number;
  color?: string;
}

const FavoriteButton = ({ wineId, className, style, size = 24, color = '#841013' }: Props) => {
  const isFavorite = useFavoritesStore((s) => s.favorites.includes(wineId));
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  return (
    <StyledFavoriteButton
      className={className}
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleFavorite(wineId);
      }}
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
