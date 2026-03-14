import React from 'react';
import { FiStar, FiMessageSquare } from 'react-icons/fi';
import { CardBase, Content, Title, RatingBlock } from './SliderCard.styled';
import styled from 'styled-components';

const StyledCard = styled(CardBase)`
  height: auto;
  min-height: 220px;
  background: #fff;
  border: 1px solid #eee;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  width: 100%;
  margin: 10px 0;
`;

const ReviewText = styled.p`
  font-size: 16px;
  color: #444;
  font-style: italic;
  line-height: 1.6;
  margin: 15px 0;
  position: relative;
`;

const AuthorName = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-top: 15px;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '—';
    color: var(--primary-wine, #841013);
  }
`;

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
    <StyledCard>
      <Content style={{ padding: '25px 30px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FiMessageSquare size={18} color="var(--primary-wine, #841013)" />
            <Title style={{ fontSize: '16px', fontWeight: 600 }}>
              {review.wineId?.name || 'Review'}
            </Title>
          </div>
          <RatingBlock>
            {[1, 2, 3, 4, 5].map((s) => (
              <FiStar
                key={s}
                size={14}
                fill={s <= review.rating ? '#ffb400' : 'none'}
                color={s <= review.rating ? '#ffb400' : '#ddd'}
              />
            ))}
          </RatingBlock>
        </div>

        <ReviewText>{review.comment}</ReviewText>

        <AuthorName>
          {review.userId?.firstName} {review.userId?.lastName}
        </AuthorName>
      </Content>
    </StyledCard>
  );
};

export default SliderCardReview;
