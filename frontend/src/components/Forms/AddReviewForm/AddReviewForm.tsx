import React, { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { createReview } from '@/api/reviews';
import { useAuthStore } from '@/store/auth/authStore';
import MainButton from '@/components/Buttons/MainButton';
import {
  FormContainer,
  TextArea,
  StarsContainer,
  StarButton,
  FormTitle,
  RatingWrapper,
} from './AddReviewForm.styled';

interface AddReviewFormProps {
  wineId?: string;
  wineryId?: string;
  tourId?: string;
  onReviewAdded?: () => void;
}

const AddReviewForm: React.FC<AddReviewFormProps> = ({
  wineId,
  wineryId,
  tourId,
  onReviewAdded,
}) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, openAuthModal } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      openAuthModal('login');
      return;
    }

    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    if (!comment.trim()) {
      setError('Please write a comment');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await createReview({ wineId, wineryId, tourId, rating, comment });
      setRating(0);
      setComment('');
      if (onReviewAdded) {
        onReviewAdded();
      }
    } catch (err: unknown) {
      const apiErr = err as { response?: { data?: { message?: string } } };
      const errorMessage = apiErr.response?.data?.message || 'Failed to submit review';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>Message:</FormTitle>

      <TextArea
        placeholder="Share your experience..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
      />

      <RatingWrapper>
        <p>Rate your experience </p>
        <StarsContainer>
          {[...Array(5)].map((_, index) => {
            const val = index + 1;
            const isFilled = val <= (hover || rating);
            return (
              <StarButton
                type="button"
                key={val}
                onClick={() => setRating(val)}
                onMouseEnter={() => setHover(val)}
                onMouseLeave={() => setHover(0)}
              >
                {isFilled ? (
                  <FaStar size={22} color="var(--star-main)" />
                ) : (
                  <FaRegStar size={22} color="var(--star-main)" />
                )}
              </StarButton>
            );
          })}
        </StarsContainer>
      </RatingWrapper>

      {error && <p style={{ color: 'red', marginBottom: '15px', fontSize: '14px' }}>{error}</p>}

      <div style={{ maxWidth: '200px' }}>
        <MainButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'SENDING...' : 'SEND'}
        </MainButton>
      </div>
    </FormContainer>
  );
};

export default AddReviewForm;
