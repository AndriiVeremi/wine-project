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

const FavoriteButton = ({ wine, className, style, size = 32, color = '#841013' }: Props) => {
  const { data: favorites = [] } = useFavorites();
  const { toggleFavorite } = useFavoriteMutations();

  const isFavorite = favorites.some((f) => (f._id || (f as { id?: string }).id) === wine._id);
  const user = useAuthStore((s) => s.user);
  const openAuthModal = useAuthStore((s) => s.openAuthModal);

  const clipId = `heart-clip-${wine._id}`;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (user) {
      toggleFavorite({ wineId: wine._id, isFavorite });
    } else {
      openAuthModal('login');
    }
  };

  const heartPath =
    'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';

  return (
    <StyledFavoriteButton
      $isFavorite={isFavorite}
      className={className}
      style={{ ...style }}
      onClick={handleToggle}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg viewBox="0 0 24 24" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id={clipId}>
            <path d={heartPath} />
          </clipPath>
        </defs>

        <g clipPath={`url(#${clipId})`}>
          <path d={heartPath} fill="rgba(132, 16, 19, 0.05)" />

          <rect className="wine-fill" x="0" y="0" width="24" height="24" fill={color} />

          <ellipse
            className="wave-effect"
            cx="12"
            cy={isFavorite ? '2' : '24'}
            rx="20"
            ry="4"
            fill="rgba(255, 255, 255, 0.15)"
          />
        </g>

        <path className="heart-outline" d={heartPath} />
      </svg>
    </StyledFavoriteButton>
  );
};

export default FavoriteButton;
