import React from 'react';
import RatingStars from '@/components/Common/RatingStars';
import { CardContainer, TourImage, Content, Name, Meta, Price } from './TourMiniCard.styled';

export interface TourMiniCardProps {
  tour: {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
    averageRating?: number;
    duration?: number;
  };
}

const TourMiniCard: React.FC<TourMiniCardProps> = ({ tour }) => {
  return (
    <CardContainer to={`/tours/${tour._id}`}>
      <TourImage src={tour.imageUrl || '/images/default-tour.png'} alt={tour.name} />
      <Content>
        <Name>{tour.name}</Name>
        <Meta>
          <Price>₾ {tour.price}</Price>
          {tour.averageRating !== undefined && (
            <RatingStars
              value={tour.averageRating}
              size={10}
              showLeftValue={false}
              showRightReviews={false}
            />
          )}
        </Meta>
      </Content>
    </CardContainer>
  );
};

export default TourMiniCard;
