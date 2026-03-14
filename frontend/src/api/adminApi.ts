import apiClient from './axios';

export const getAllUsers = (params: { search?: string; page?: number; limit?: number }) => {
  return apiClient.get('/users', { params });
};

export const toggleUserBan = (id: string) => {
  return apiClient.patch(`/users/${id}/ban`);
};

export const deleteUser = (id: string) => {
  return apiClient.delete(`/users/${id}`);
};

export const getAllReviews = (params: { page?: number; limit?: number }) => {
  return apiClient.get('/reviews', { params });
};

export const deleteReview = (reviewId: string) => {
  return apiClient.delete(`/reviews/${reviewId}`);
};
