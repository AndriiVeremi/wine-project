import React from 'react';
import RatingStars from '@/components/Common/RatingStars';
import { CardContainer, WineImage, Content, Name, Meta, Price } from './WineMiniCard.styled';

export interface WineMiniCardProps {
  wine: {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
    averageRating?: number;
    color?: string;
    sweetness?: string;
    vintage?: number;
  };
}

const WineMiniCard: React.FC<WineMiniCardProps> = ({ wine }) => {
  return (
    <CardContainer to={`/wines/${wine._id}`}>
      <WineImage src={wine.imageUrl} alt={wine.name} />
      <Content>
        <Name>
          {wine.name} {wine.vintage && wine.vintage > 0 ? `(${wine.vintage})` : ''}
        </Name>
        <Meta>
          <Price>{wine.price > 0 ? `₾ ${wine.price}` : 'Request'}</Price>
          {wine.averageRating !== undefined && (
            <RatingStars
              value={wine.averageRating}
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

export default WineMiniCard;
