import { Link } from 'react-router-dom';
import type { Wine } from '@/types/wine';
import {
  StyledWineCardDiv,
  WineImage,
  WineDescription,
  WineTitle,
  StyledFavoriteButton,
  WineHeader,
  WineVintage,
  WineryName,
  TagsContainer,
  Tag,
  PriceRatingRow,
  WinePrice,
} from './WineCard.styled';
import RatingStars from '@/components/common/RatingStars';

interface WineCardProps {
  wine: Wine;
}

const WineCard = ({ wine }: WineCardProps) => {
  return (
    <Link to={`/wines/${wine._id}`}>
      <StyledWineCardDiv>
        <StyledFavoriteButton wine={wine} size={28} />
        <WineImage src={wine.imageUrl} alt={wine.name} />

        <WineHeader>
          <WineTitle>{wine.name}</WineTitle>
          {wine.vintage > 0 && <WineVintage>{wine.vintage}</WineVintage>}
        </WineHeader>

        <WineryName>{wine.winery?.name || 'Unknown Winery'}</WineryName>

        <TagsContainer>
          <Tag>{wine.color}</Tag>
          <Tag>{wine.sweetness}</Tag>
          {wine.grape?.name && <Tag>{wine.grape.name}</Tag>}
        </TagsContainer>

        <WineDescription>{wine.description}</WineDescription>

        <PriceRatingRow>
          <WinePrice>{wine.price > 0 ? `$${wine.price}` : 'Price on request'}</WinePrice>
          <RatingStars
            value={wine.averageRating ?? 0}
            showLeftValue={false}
            showRightReviews={false}
            size={14}
          />
        </PriceRatingRow>
      </StyledWineCardDiv>
    </Link>
  );
};

export default WineCard;
