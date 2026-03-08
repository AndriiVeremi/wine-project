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
    <CardBase>
      <ImageWrapper>
        <img src={wine.imageUrl} alt={wine.name} />
      </ImageWrapper>
      <Content>
        <Title>{wine.name}</Title>

        <RatingBlock>
          <FiStar fill={wine.averageRating && wine.averageRating > 0 ? '#ffb400' : 'none'} />
          <span style={{ fontWeight: 'bold', color: '#333' }}>
            {wine.averageRating && wine.averageRating > 0 ? wine.averageRating : 'No rating'}
          </span>
        </RatingBlock>

        <p
          style={{
            fontSize: '13px',
            color: '#666',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            margin: 0,
          }}
        >
          <FiCalendar size={14} /> Vintage: {wine.vintage}
        </p>

        <p
          style={{
            fontSize: '20px',
            color: 'var(--primary-wine)',
            fontWeight: 'bold',
            margin: '5px 0',
          }}
        >
          {wine.price} UAH
        </p>

        <FooterLink onClick={() => navigate(`/wines/${wine._id}`)}>Order Now →</FooterLink>
      </Content>
    </CardBase>
  );
};

export default SliderCardWine;
