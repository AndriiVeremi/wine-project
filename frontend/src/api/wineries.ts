import apiClient from './axios';

export const getWineries = (params?: any) => {
  return apiClient.get('/wineries', { params });
};
