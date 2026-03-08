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

interface WineCardProps {
  wine: Wine;
}

const WineCard = ({ wine }: WineCardProps) => {
  return (
    <Link to={`/wines/${wine._id}`}>
      <StyledWineCardDiv>
        <StyledFavoriteButton wineId={wine._id} />
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
