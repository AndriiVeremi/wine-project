import React from 'react';
import { FiStar, FiCalendar } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import {
  CardBase,
  ImageWrapper,
  Content,
  Title,
  RatingBlock,
  FooterLink,
  PriceBadge,
} from './SliderCard.styled';

interface WineCardProps {
  wine: {
    _id: string;
    name: string;
    imageUrl: string;
    price: number;
    vintage: number;
    averageRating?: number;
    totalReviews?: number;
  };
}

const SliderCardWine: React.FC<WineCardProps> = ({ wine }) => {
  const navigate = useNavigate();

  return (
    <CardBase onClick={() => navigate(`/wines/${wine._id}`)}>
      <ImageWrapper>
        <img src={wine.imageUrl} alt={wine.name} />
        <PriceBadge>{wine.price} $</PriceBadge>
      </ImageWrapper>
      <Content>
        <Title>{wine.name}</Title>

        <RatingBlock>
          <FiStar fill={wine.averageRating && wine.averageRating > 0 ? '#ffb400' : 'none'} />
          <span style={{ fontWeight: 'bold', color: '#333' }}>
            {wine.averageRating && wine.averageRating > 0 ? wine.averageRating : 'No rating'}
          </span>
          <span style={{ fontSize: '12px', color: '#666', marginLeft: '4px' }}>
            ({wine.totalReviews || 0})
          </span>
        </RatingBlock>

        <p
          style={{
            fontSize: '13px',
            color: '#666',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            margin: '4px 0',
          }}
        >
          <FiCalendar size={14} /> Vintage: {wine.vintage}
        </p>

        <FooterLink>Order Now →</FooterLink>
      </Content>
    </CardBase>
  );
};

export default SliderCardWine;
