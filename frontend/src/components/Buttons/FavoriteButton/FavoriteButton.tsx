import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { StyledFavoriteButton } from './FavoriteButton.styled';
import { useFavoritesStore } from '@/store/user/useFavoritesStore';
import type { Wine, WishlistWine } from '@/types/wine';
import { useAuthStore } from '@/store/auth/authStore';

interface Props {
  wine: Wine | WishlistWine;
  className?: string;
  style?: React.CSSProperties;
  size?: number;
  color?: string;
}

const FavoriteButton = ({ wine, className, style, size = 24, color = '#841013' }: Props) => {
  const wineId = 'id' in wine ? wine.id : wine._id;
  const isFavorite = useFavoritesStore((s) => s.isFavorite(wineId));
  const user = useAuthStore((s) => s.user);
  const openAuthModal = useAuthStore((s) => s.openAuthModal);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const wishlistWine: WishlistWine =
      'id' in wine
        ? wine
        : {
            id: wine._id,
            name: wine.name,
            imageUrl: wine.imageUrl,
            color: wine.color,
            sweetness: wine.sweetness,
            winery: wine.winery ? { id: wine.winery._id, name: wine.winery.name } : null,
          };
    if (user) {
      toggleFavorite(wishlistWine);
    } else {
      openAuthModal('login');
    }
  };

  return (
    <StyledFavoriteButton className={className} style={style} onClick={handleToggle}>
      {isFavorite ? (
        <FaHeart size={size} color={color} />
      ) : (
        <FaRegHeart size={size} color={color} />
      )}
    </StyledFavoriteButton>
  );
};

export default FavoriteButton;
