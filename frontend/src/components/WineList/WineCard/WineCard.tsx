import { Link } from 'react-router-dom';
import type { Wine } from '@/types/wine';
import {
  StyledWineCardDiv,
  WineImage,
  WineDescription,
  WineTitle,
  StyledFavoriteButton,
} from './WineCard.styled';
import RatingStars from '@/components/common/RatingStars';
import VIPBadge from '@/components/common/VIPBadge';

interface WineCardProps {
  wine: Wine;
}

const WineCard = ({ wine }: WineCardProps) => {
  return (
    <Link to={`/wines/${wine._id}`}>
      <StyledWineCardDiv>
        {wine.isVip && <VIPBadge size={60} style={{ position: 'absolute', top: 0, left: 0 }} />}
        <StyledFavoriteButton wineId={wine._id} size={32} />
        <WineImage src={wine.imageUrl} alt={wine.name} />

        <WineTitle>{wine.name}</WineTitle>

        <RatingStars
          value={wine.averageRating ?? 0}
          showLeftValue={true}
          showRightReviews={true}
          size={16}
        />

        <WineDescription>{wine.description}</WineDescription>
      </StyledWineCardDiv>
    </Link>
  );
};

export default WineCard;
