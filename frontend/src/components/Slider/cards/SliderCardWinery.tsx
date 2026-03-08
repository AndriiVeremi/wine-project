import React from 'react';
import { FiMapPin, FiStar } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import {
  CardBase,
  ImageWrapper,
  Content,
  Title,
  RatingBlock,
  FooterLink,
} from './SliderCard.styled';

interface WineryCardProps {
  winery: {
    _id: string;
    name: string;
    logoUrl?: string;
    history?: string;
    averageRating?: number;
    totalReviews?: number;
    region?: { name: string };
  };
}

const SliderCardWinery: React.FC<WineryCardProps> = ({ winery }) => {
  const navigate = useNavigate();

  return (
    <CardBase>
      <ImageWrapper>
        <img src={winery.logoUrl || 'https://placehold.co/400x200?text=Winery'} alt={winery.name} />
      </ImageWrapper>
      <Content>
        <Title>{winery.name}</Title>

        <RatingBlock>
          <FiStar fill={winery.averageRating && winery.averageRating > 0 ? '#ffb400' : 'none'} />
          <span style={{ fontWeight: 'bold', color: '#333' }}>
            {winery.averageRating && winery.averageRating > 0 ? winery.averageRating : 'No rating'}
          </span>
          <span style={{ color: '#999', fontSize: '12px' }}>
            ({winery.totalReviews || 0} reviews)
          </span>
        </RatingBlock>

        <p
          style={{
            fontSize: '13px',
            color: 'var(--primary-wine)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            margin: 0,
          }}
        >
          <FiMapPin size={14} /> {winery.region?.name || 'Georgia'}
        </p>

        <p
          style={{
            fontSize: '13px',
            color: '#666',
            margin: '5px 0',
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: '1.5',
          }}
        >
          {winery.history || 'Discover our unique traditions and exceptional wine quality.'}
        </p>

        <FooterLink onClick={() => navigate(`/wineries/${winery._id}`)}>
          View Winery Details →
        </FooterLink>
      </Content>
    </CardBase>
  );
};

export default SliderCardWinery;
