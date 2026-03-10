import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTrash2, FiMessageSquare, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getUserReviews, deleteReview } from '@/api/reviews';
import type { Review } from '@/types/wine';
import { Loader } from '@/components/common/Loader';
import RatingStars from '@/components/common/RatingStars';
import {
  ReviewsContainer,
  ReviewItem,
  WineImageWrapper,
  ReviewContent,
  ReviewHeader,
  WineTitle,
  ReviewComment,
  ReviewFooter,
  ReviewDate,
  ActionButtons,
  ActionButton,
  PaginationContainer,
  PaginationButton,
  EmptyState,
} from './UserReviews.styled';

const AccountReviews: React.FC = () => {
  const [items, setItems] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);
  const navigate = useNavigate();

  const loadData = async (p: number) => {
    setLoading(true);
    try {
      const { data } = await getUserReviews(p);
      setItems(data.reviews);
      setPagesCount(data.totalPages);
    } catch {
      toast.error('Could not load reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(currentPage);
  }, [currentPage]);

  const removeReview = async (wineId: string, reviewId: string) => {
    if (!window.confirm('Delete this review?')) return;

    try {
      await deleteReview(wineId, reviewId);
      toast.success('Deleted!');

      if (items.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        loadData(currentPage);
      }
    } catch {
      toast.error('Error deleting review');
    }
  };

  if (loading) return <Loader />;

  if (items.length === 0) {
    return (
      <EmptyState>
        <FiMessageSquare size={50} />
        <h3>No reviews found</h3>
        <p>Tell us what you think about the wines!</p>
      </EmptyState>
    );
  }

  return (
    <ReviewsContainer>
      {items.map((item) => {
        const isWineObject = typeof item.wineId === 'object' && item.wineId !== null;
        const wineInfo = isWineObject
          ? (item.wineId as { _id: string; name: string; imageUrl: string })
          : null;

        return (
          <ReviewItem key={item._id}>
            {wineInfo && (
              <WineImageWrapper onClick={() => navigate(`/wines/${wineInfo._id}`)}>
                <img src={wineInfo.imageUrl} alt={wineInfo.name} />
              </WineImageWrapper>
            )}

            <ReviewContent>
              <div>
                <ReviewHeader>
                  {wineInfo ? (
                    <WineTitle onClick={() => navigate(`/wines/${wineInfo._id}`)}>
                      {wineInfo.name}
                    </WineTitle>
                  ) : (
                    <WineTitle>Wine #{String(item.wineId)}</WineTitle>
                  )}
                  <RatingStars value={item.rating} size={18} />
                </ReviewHeader>
                <ReviewComment>{item.comment}</ReviewComment>
              </div>

              <ReviewFooter>
                <ReviewDate>{new Date(item.createdAt).toLocaleDateString()}</ReviewDate>

                <ActionButtons>
                  {wineInfo && (
                    <ActionButton onClick={() => navigate(`/wines/${wineInfo._id}`)}>
                      <FiArrowRight />
                    </ActionButton>
                  )}

                  <ActionButton
                    $variant="delete"
                    onClick={() =>
                      removeReview(wineInfo ? wineInfo._id : (item.wineId as string), item._id)
                    }
                  >
                    <FiTrash2 />
                  </ActionButton>
                </ActionButtons>
              </ReviewFooter>
            </ReviewContent>
          </ReviewItem>
        );
      })}

      {pagesCount > 1 && (
        <PaginationContainer>
          <PaginationButton
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Back
          </PaginationButton>
          <span>
            Page {currentPage} of {pagesCount}
          </span>
          <PaginationButton
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === pagesCount}
          >
            Next
          </PaginationButton>
        </PaginationContainer>
      )}
    </ReviewsContainer>
  );
};

export default AccountReviews;
