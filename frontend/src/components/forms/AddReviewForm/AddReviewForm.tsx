import React, { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { createReview } from '@/api/reviews';
import {
  FormContainer,
  TextArea,
  StarsContainer,
  StarButton,
  SendButton,
  FormTitle,
  RatingWrapper,
} from './AddReviewForm.styled';

interface AddReviewFormProps {
  wineId: string;
  onReviewAdded?: () => void;
}

const AddReviewForm: React.FC<AddReviewFormProps> = ({ wineId, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      await createReview(wineId, { rating, comment });
      setRating(0);
      setComment('');
      if (onReviewAdded) {
        onReviewAdded();
      }
    } catch (err: unknown) {
      const errorMessage =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response: { data: { message: string } } }).response?.data?.message
          : 'Failed to submit review';
      setError(errorMessage || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>Message:</FormTitle>

      <TextArea
        placeholder="Share your experience with this wine..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
      />

      <RatingWrapper>
        <p>Rate the product </p>
        <StarsContainer>
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            const isFilled = ratingValue <= (hover || rating);
            return (
              <StarButton
                type="button"
                key={ratingValue}
                onClick={() => setRating(ratingValue)}
                onMouseEnter={() => setHover(ratingValue)}
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

      {error && <p style={{ color: 'red', marginTop: '8px' }}>{error}</p>}

      <SendButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send'}
      </SendButton>
    </FormContainer>
  );
};

export default AddReviewForm;
