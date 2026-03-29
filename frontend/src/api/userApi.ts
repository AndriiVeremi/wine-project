import apiClient from './axios';
import type { Wine } from '@/types/wine';

export const getFavorites = () => {
  return apiClient.get<Wine[]>('/users/me/favorites');
};

export const addWineToFavorites = (wineId: string) => {
  return apiClient.post('/users/me/favorites', { wineId });
};

export const removeWineFromFavorites = (wineId: string) => {
  return apiClient.delete(`/users/me/favorites/${wineId}`);
};
