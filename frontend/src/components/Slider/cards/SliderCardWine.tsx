import React from 'react';
import { FiStar, FiCalendar, FiMapPin } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import type { Wine } from '@/types/wine';
import {
  CardBase,
  ImageWrapper,
  Content,
  Title,
  WineryName,
  WineMeta,
  RatingBlock,
  FooterLink,
  PriceBadge,
} from './SliderCard.styled';

interface WineCardProps {
  wine: Wine;
}

const SliderCardWine: React.FC<WineCardProps> = ({ wine }) => {
  const navigate = useNavigate();

  return (
    <CardBase onClick={() => navigate(`/wines/${wine._id}`)}>
      <ImageWrapper>
        <img src={wine.imageUrl} alt={wine.name} />
        <PriceBadge>₾ {wine.price}</PriceBadge>
      </ImageWrapper>
      <Content>
        <WineryName>
          <FiMapPin size={12} /> {wine.winery?.name || 'Unknown Winery'}
        </WineryName>
        <Title title={wine.name}>{wine.name}</Title>

        <WineMeta>
          {wine.color}
          <span className="dot" />
          {wine.sweetness}
          <span className="dot" />
          {wine.grape?.name || 'Grape'}
        </WineMeta>

        <RatingBlock>
          <FiStar fill={wine.averageRating && wine.averageRating > 0 ? '#ffb400' : 'none'} />
          <span style={{ fontWeight: 'bold', color: '#333' }}>
            {wine.averageRating && wine.averageRating > 0 ? wine.averageRating.toFixed(1) : '—'}
          </span>
          <span style={{ fontSize: '12px', color: '#666' }}>
            ({wine.totalReviews || 0} reviews)
          </span>
        </RatingBlock>

        <p
          style={{
            fontSize: '13px',
            color: '#666',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            margin: '0',
          }}
        >
          <FiCalendar size={14} /> Vintage: {wine.vintage}
        </p>

        <FooterLink>View Details →</FooterLink>
      </Content>
    </CardBase>
  );
};

export default SliderCardWine;
