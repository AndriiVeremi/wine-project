import React from 'react';
import { FiStar, FiMessageSquare } from 'react-icons/fi';
import { CardBase, Content, Title, RatingBlock } from './SliderCard.styled';

interface ReviewCardProps {
  review: {
    _id: string;
    rating: number;
    comment: string;
    userId?: {
      firstName: string;
      lastName: string;
    };
    wineId?: {
      name: string;
    };
  };
}

const SliderCardReview: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <CardBase style={{ height: '280px' }}>
      {' '}
      {/* Для відгуків картка може бути меншою */}
      <Content style={{ padding: '25px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <FiMessageSquare size={20} color="var(--primary-wine)" />
          <Title>{review.wineId?.name || 'Wine Review'}</Title>
        </div>

        <RatingBlock>
          {[1, 2, 3, 4, 5].map((s) => (
            <FiStar key={s} fill={s <= review.rating ? '#ffb400' : 'none'} />
          ))}
        </RatingBlock>

        <p
          style={{
            fontSize: '15px',
            color: '#555',
            fontStyle: 'italic',
            lineHeight: '1.6',
            margin: '15px 0',
          }}
        >
          "{review.comment}"
        </p>

        <p
          style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: 'var(--font-dark)',
            marginTop: 'auto',
          }}
        >
          — {review.userId?.firstName} {review.userId?.lastName}
        </p>
      </Content>
    </CardBase>
  );
};

export default SliderCardReview;
