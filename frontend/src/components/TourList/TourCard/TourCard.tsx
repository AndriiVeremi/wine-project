import { FiClock, FiUsers } from 'react-icons/fi';
import type { Tour } from '@/types/tours';
import { Link } from 'react-router-dom';
import {
  InfoItem,
  InfoRow,
  Price,
  StyledTourCardDiv,
  StyledTourRatingStars,
  TourCardImage,
  TourCardInfo,
  TourCardTitle,
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
          <TourCardTitle>{tour.name}</TourCardTitle>
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

          <Price>
            <span>£{tour.price}/person</span>
            <StyledTourRatingStars value={tour.averageRating} size={14} />
          </Price>
        </TourCardInfo>
      </StyledTourCardDiv>
    </Link>
  );
};

export default TourCard;
