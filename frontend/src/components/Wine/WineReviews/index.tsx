import React, { useEffect, useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { getWineReviews, getWineryReviews, getTourReviews } from '@/api/reviews';
import type { Review } from '@/types/wine';
import RatingStars from '@/components/Common/RatingStars';
import AppPagination from '@/components/Common/AppPagination/AppPagination';
import {
  WineReviewsContainer,
  ReviewItem,
  AvatarWrapper,
  ReviewContent,
  ReviewHeader,
  AuthorName,
  ReviewDate,
  ReviewText,
  NoReviewsMessage,
} from './WineReviews.styled';

interface Props {
  wineId?: string;
  wineryId?: string;
  tourId?: string;
}

const ItemReviews: React.FC<Props> = ({ wineId, wineryId, tourId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 2;

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        let res;
        if (wineId) res = await getWineReviews(wineId);
        else if (wineryId) res = await getWineryReviews(wineryId);
        else if (tourId) res = await getTourReviews(tourId);

        if (res?.data) {
          const data = Array.isArray(res.data) ? res.data : res.data.reviews || [];
          setReviews(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [wineId, wineryId, tourId]);

  if (loading)
    return <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>Loading...</p>;

  if (reviews.length === 0) {
    return (
      <NoReviewsMessage>No reviews yet. Be the first to share your experience!</NoReviewsMessage>
    );
  }

  const totalPages = Math.ceil(reviews.length / limit);
  const currentItems = reviews.slice((page - 1) * limit, page * limit);

  return (
    <WineReviewsContainer>
      {currentItems.map((r) => {
        const u = r.userId as unknown as {
          firstName: string;
          lastName: string;
          avatarUrl?: string;
        };
        return (
          <ReviewItem key={r._id}>
            <AvatarWrapper>
              {u?.avatarUrl ? <img src={u.avatarUrl} alt="User" /> : <FiUser />}
            </AvatarWrapper>

            <ReviewContent>
              <ReviewHeader>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <AuthorName>
                    {u?.firstName} {u?.lastName}
                  </AuthorName>
                  <ReviewDate>{new Date(r.createdAt).toLocaleDateString()}</ReviewDate>
                </div>
                <RatingStars value={r.rating} size={16} />
              </ReviewHeader>

              <ReviewText>{r.comment}</ReviewText>
            </ReviewContent>
          </ReviewItem>
        );
      })}

      {totalPages > 1 && (
        <div style={{ marginTop: '10px' }}>
          <AppPagination page={page} totalPages={totalPages} onChange={(p) => setPage(p)} />
        </div>
      )}
    </WineReviewsContainer>
  );
};

export default ItemReviews;
