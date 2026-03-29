import { FiClock, FiUsers } from 'react-icons/fi';
import type { Tour } from '@/types/tours';
import { Link } from 'react-router-dom';
import { stripHtml } from '@/utils/text';
import {
  InfoItem,
  InfoRow,
  Price,
  PriceRatingRow,
  StyledTourCardDiv,
  StyledTourRatingStars,
  TourCardImage,
  TourCardInfo,
  TourCardTitle,
  TourCardDescription,
} from './TourCard.styled';

interface PropsTourCard {
  tour: Tour;
}

const TourCard = ({ tour }: PropsTourCard) => {
  return (
    <Link to={`/tours/${tour._id}`}>
      <StyledTourCardDiv>
        <TourCardImage src={tour.images[0]} />
        <TourCardInfo>
          <TourCardTitle title={tour.name}>{tour.name}</TourCardTitle>
          <TourCardDescription>{stripHtml(tour.description || '')}</TourCardDescription>
          <InfoRow>
            <InfoItem>
              <FiClock />
              {tour.duration} h
            </InfoItem>

            <InfoItem>
              <FiUsers />
              {tour.groupSize.min}–{tour.groupSize.max}
            </InfoItem>
          </InfoRow>

          <PriceRatingRow>
            <Price>₾ {tour.price} / person</Price>
            <StyledTourRatingStars value={tour.averageRating} size={14} />
          </PriceRatingRow>
        </TourCardInfo>
      </StyledTourCardDiv>
    </Link>
  );
};

export default TourCard;
