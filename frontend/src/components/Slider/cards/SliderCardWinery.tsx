import React from 'react';
import { FiMapPin, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
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
    region?: string | { name: string };
  };
}

const SliderCardWinery: React.FC<WineryCardProps> = ({ winery }) => {
  const regionName =
    typeof winery.region === 'string' ? winery.region : winery.region?.name || 'Georgia';

  const stripHtml = (html: string) => html.replace(/<[^>]*>?/gm, '');

  return (
    <CardBase>
      <ImageWrapper>
        <img
          src={winery.logoUrl || 'https://placehold.co/400x200?text=Winery'}
          alt={winery.name}
          loading="lazy"
          width="400"
          height="200"
        />
      </ImageWrapper>
      <Content>
        <Title>{winery.name}</Title>

        <RatingBlock aria-label={`Rating: ${winery.averageRating || 0} out of 5 stars`}>
          <FiStar
            fill={winery.averageRating && winery.averageRating > 0 ? '#ffb400' : 'none'}
            aria-hidden="true"
          />
          <span style={{ fontWeight: 'bold', color: '#333' }}>
            {winery.averageRating && winery.averageRating > 0
              ? winery.averageRating.toFixed(1)
              : 'No rating'}
          </span>
          <span style={{ color: '#666', fontSize: '12px' }}>
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
          <FiMapPin size={14} aria-hidden="true" /> {regionName}
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
          {stripHtml(
            winery.history || 'Discover our unique traditions and exceptional wine quality.',
          )}
        </p>

        <FooterLink
          as={Link}
          to={`/wineries/${winery._id}`}
          aria-label={`View details of ${winery.name}`}
        >
          View Winery Details →
        </FooterLink>
      </Content>
    </CardBase>
  );
};

export default SliderCardWinery;
