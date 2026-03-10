import React, { useEffect, useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { getWineReviews } from '@/api/reviews';
import type { Review } from '@/types/wine';
import RatingStars from '@/components/common/RatingStars';
import {
  WineReviewsContainer,
  AvatarList,
  AvatarWrapper,
  ReviewContent,
  ReviewText,
  ReviewAuthorInfo,
  AuthorName,
  NoReviewsMessage
} from './WineReviews.styled';

interface WineReviewsProps {
  wineId: string;
}

const WineReviews: React.FC<WineReviewsProps> = ({ wineId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeReview, setActiveReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await getWineReviews(wineId);
        setReviews(data);
        if (data.length > 0) {
          setActiveReview(data[0]);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    if (wineId) {
      fetchReviews();
    }
  }, [wineId]);

  if (loading) return <p>Loading reviews...</p>;
  
  if (reviews.length === 0) {
    return <NoReviewsMessage>No reviews yet. Be the first to share your experience!</NoReviewsMessage>;
  }

  return (
    <WineReviewsContainer>
      <AvatarList>
        {reviews.map((review) => {
          const user = review.userId as { _id: string; firstName: string; lastName: string; avatarUrl?: string };
          return (
            <AvatarWrapper 
              key={review._id} 
              $active={activeReview?._id === review._id}
              onClick={() => setActiveReview(review)}
            >
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} />
              ) : (
                <FiUser />
              )}
            </AvatarWrapper>
          );
        })}
      </AvatarList>

      {activeReview && (
        <ReviewContent>
          <ReviewText>{activeReview.comment}</ReviewText>
          <ReviewAuthorInfo>
            <AuthorName>
              {(activeReview.userId as { firstName: string; lastName: string }).firstName}{' '}
              {(activeReview.userId as { firstName: string; lastName: string }).lastName}
            </AuthorName>
            <RatingStars value={activeReview.rating} size={18} />
          </ReviewAuthorInfo>
        </ReviewContent>
      )}
    </WineReviewsContainer>
  );
};

export default WineReviews;
