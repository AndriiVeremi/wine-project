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
import RatingStars from '@/components/Common/RatingStars';
import { stripHtml } from '@/utils/text';

interface WineCardProps {
  wine: Wine;
}

const WineCard = ({ wine }: WineCardProps) => {
  const cleanDesc = stripHtml(wine.description || '');

  return (
    <StyledWineCardDiv>
      <StyledFavoriteButton wine={wine} size={28} />
      <Link
        to={`/wines/${wine._id}`}
        style={{
          textDecoration: 'none',
          color: 'inherit',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <WineImage src={wine.imageUrl} alt={wine.name} loading="lazy" width="310" height="310" />

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

        <WineDescription>{cleanDesc}</WineDescription>

        <PriceRatingRow>
          <WinePrice>{wine.price > 0 ? `$ ${wine.price}` : 'Price on request'}</WinePrice>
          <RatingStars
            value={wine.averageRating ?? 0}
            showLeftValue={false}
            showRightReviews={false}
            size={14}
          />
        </PriceRatingRow>
      </Link>
    </StyledWineCardDiv>
  );
};

export default WineCard;
