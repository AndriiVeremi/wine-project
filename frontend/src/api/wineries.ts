import apiClient from './axios';

export const getWineries = (params?: Record<string, unknown>) => {
  return apiClient.get('/wineries', { params });
};
