import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiStar,
  FiEdit,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiMessageSquare,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getUserReviews, deleteReview } from '@/api/reviews';
import type { Review } from '@/types/wine';
import {
  ReviewsContainer,
  ReviewItem,
  WineImageWrapper,
  ReviewContent,
  ReviewHeader,
  WineTitle,
  StarRating,
  ReviewComment,
  ReviewFooter,
  ReviewDate,
  ActionButtons,
  ActionButton,
  PaginationContainer,
  PaginationButton,
  EmptyState,
} from './AccountReviews.styled';

const AccountReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchReviews = async (currentPage: number) => {
    setLoading(true);
    try {
      const { data } = await getUserReviews(currentPage);
      setReviews(data.reviews);
      setTotalPages(data.totalPages);
    } catch {
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(page);
  }, [page]);

  const handleDelete = async (wineId: string, reviewId: string) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      await deleteReview(wineId, reviewId);
      toast.success('Review deleted');
      // If we deleted the last item on the page, go back
      if (reviews.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        fetchReviews(page);
      }
    } catch {
      toast.error('Failed to delete review');
    }
  };

  const handleEdit = (wineId: string) => {
    // Navigate to wine detail page or open a modal
    // For now, let's just show a toast or redirect to the wine
    navigate(`/wines/${wineId}`);
    toast('You can edit your review on the wine page', { icon: 'ℹ️' });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <FiStar
        key={i}
        fill={i < rating ? 'var(--rating-gold)' : 'none'}
        stroke={i < rating ? 'var(--rating-gold)' : 'var(--secondary-gray)'}
      />
    ));
  };

  if (loading) return <div>Loading reviews...</div>;

  if (reviews.length === 0) {
    return (
      <EmptyState>
        <FiMessageSquare size={60} color="var(--secondary-gray)" />
        <h3 style={{ marginTop: '20px', color: 'var(--primary-gray)' }}>No reviews yet</h3>
        <p style={{ color: 'var(--secondary-gray)' }}>
          Share your thoughts about wines you've tasted!
        </p>
      </EmptyState>
    );
  }

  return (
    <ReviewsContainer>
      {reviews.map((review) => (
        <ReviewItem key={review._id}>
          <WineImageWrapper onClick={() => navigate(`/wines/${review.wineId._id}`)}>
            <img
              src={review.wineId.imageUrl || '/assets/wine-placeholder.png'}
              alt={review.wineId.name}
            />
          </WineImageWrapper>

          <ReviewContent>
            <div>
              <ReviewHeader>
                <WineTitle onClick={() => navigate(`/wines/${review.wineId._id}`)}>
                  {review.wineId.name}
                </WineTitle>
                <StarRating>{renderStars(review.rating)}</StarRating>
              </ReviewHeader>
              <ReviewComment>{review.comment}</ReviewComment>
            </div>

            <ReviewFooter>
              <ReviewDate>{formatDate(review.createdAt)}</ReviewDate>
              <ActionButtons>
                <ActionButton
                  $variant="edit"
                  onClick={() => handleEdit(review.wineId._id)}
                  title="Edit"
                >
                  <FiEdit />
                </ActionButton>
                <ActionButton
                  $variant="delete"
                  onClick={() => handleDelete(review.wineId._id, review._id)}
                  title="Delete"
                >
                  <FiTrash2 />
                </ActionButton>
              </ActionButtons>
            </ReviewFooter>
          </ReviewContent>
        </ReviewItem>
      ))}

      {totalPages > 1 && (
        <PaginationContainer>
          <PaginationButton onClick={() => setPage(page - 1)} disabled={page === 1}>
            <FiChevronLeft />
          </PaginationButton>

          {Array.from({ length: totalPages }).map((_, i) => (
            <PaginationButton key={i} $active={page === i + 1} onClick={() => setPage(i + 1)}>
              {i + 1}
            </PaginationButton>
          ))}

          <PaginationButton onClick={() => setPage(page + 1)} disabled={page === totalPages}>
            <FiChevronRight />
          </PaginationButton>
        </PaginationContainer>
      )}
    </ReviewsContainer>
  );
};

export default AccountReviews;
