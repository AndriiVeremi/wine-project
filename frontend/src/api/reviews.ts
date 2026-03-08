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

export const createReview = (wineId: string, data: { rating: number; comment: string }) => {
  return apiClient.post(`/wines/${wineId}/reviews`, data);
};

export const deleteReview = (wineId: string, reviewId: string) => {
  return apiClient.delete(`/wines/${wineId}/reviews/${reviewId}`);
};

export const updateReview = (
  wineId: string,
  reviewId: string,
  data: { rating: number; comment: string },
) => {
  return apiClient.patch(`/wines/${wineId}/reviews/${reviewId}`, data);
};
