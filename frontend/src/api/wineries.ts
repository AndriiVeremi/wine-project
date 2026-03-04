import apiClient from './axios';

export const getWineries = () => {
  return apiClient.get('/wineries');
};
