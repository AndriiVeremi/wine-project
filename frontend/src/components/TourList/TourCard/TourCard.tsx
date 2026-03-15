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
        <TourCardTitle>{tour.name}</TourCardTitle>
        <StyledTourRatingStars value={tour.averageRating} showLeftValue={true} />
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

        <Price>£{tour.price} / person</Price>
      </StyledTourCardDiv>
    </Link>
  );
};

export default TourCard;
