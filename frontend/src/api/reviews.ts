import apiClient from './axios';
import type { UserReviewResponse } from '@/types/wine';

export const getUserReviews = (page: number = 1, limit: number = 5) => {
  return apiClient.get<UserReviewResponse>('/users/me/reviews', {
    params: { page, limit },
  });
};

export const getWineReviews = (wineId: string) => {
  return apiClient.get(`/wines/${wineId}/reviews`);
};

export const getWineryReviews = (wineryId: string) => {
  return apiClient.get(`/wineries/${wineryId}/reviews`);
};

export const getTourReviews = (tourId: string) => {
  return apiClient.get(`/tours/${tourId}/reviews`);
};

export const createReview = (data: {
  wineId?: string;
  wineryId?: string;
  tourId?: string;
  rating: number;
  comment: string;
}) => {
  const { wineId, wineryId, tourId, ...rest } = data;
  const path = wineId
    ? `/wines/${wineId}/reviews`
    : wineryId
      ? `/wineries/${wineryId}/reviews`
      : `/tours/${tourId}/reviews`;

  return apiClient.post(path, rest);
};

export const deleteReview = (
  targetId: string,
  reviewId: string,
  type: 'wine' | 'winery' | 'tour',
) => {
  const prefix = type === 'wine' ? 'wines' : type === 'winery' ? 'wineries' : 'tours';
  return apiClient.delete(`/${prefix}/${targetId}/reviews/${reviewId}`);
};
