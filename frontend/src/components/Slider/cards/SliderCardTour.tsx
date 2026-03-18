import React from 'react';
import { FiStar, FiClock, FiUsers } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import {
  CardBase,
  ImageWrapper,
  Content,
  Title,
  RatingBlock,
  FooterLink,
} from './SliderCard.styled';

interface TourCardProps {
  tour: {
    _id: string;
    name: string;
    images: string[];
    price: number;
    duration: number;
    averageRating?: number;
    totalReviews?: number;
  };
}

const SliderCardTour: React.FC<TourCardProps> = ({ tour }) => {
  const navigate = useNavigate();

  return (
    <CardBase>
      <ImageWrapper>
        <img src={tour.images?.[0]} alt={tour.name} />
      </ImageWrapper>
      <Content>
        <Title>{tour.name}</Title>

        <RatingBlock>
          <FiStar fill={tour.averageRating && tour.averageRating > 0 ? '#ffb400' : 'none'} />
          <span style={{ fontWeight: 'bold', color: '#333' }}>
            {tour.averageRating && tour.averageRating > 0 ? tour.averageRating : 'No rating'}
          </span>
        </RatingBlock>

        <p
          style={{
            fontSize: '13px',
            color: '#666',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            margin: '5px 0',
          }}
        >
          <FiClock size={14} /> {tour.duration} hours
        </p>

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
          <FiUsers size={14} /> {tour.groupSize?.min}-{tour.groupSize?.max} people
        </p>

        <p
          style={{
            fontSize: '20px',
            color: 'var(--primary-wine)',
            fontWeight: 'bold',
            margin: '8px 0 5px',
          }}
        >
          £{tour.price}/person
        </p>

        <FooterLink onClick={() => navigate(`/tours/${tour._id}`)}>View Tour →</FooterLink>
      </Content>
    </CardBase>
  );
};

export default SliderCardTour;
