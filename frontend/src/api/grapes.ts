import apiClient from './axios';

export const getGrapes = () => {
  return apiClient.get('/grapes');
};
