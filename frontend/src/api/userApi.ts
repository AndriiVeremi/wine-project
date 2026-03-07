import apiClient from './axios';
import type { WishlistWine } from '@/types/wine';

export const getUserFavorites = () => {
  return apiClient.get<WishlistWine[]>('/users/me/favorites');
};

export const addWineToFavorites = (wineId: string) => {
  return apiClient.post('/users/me/favorites', { wineId });
};

export const removeWineFromFavorites = (wineId: string) => {
  return apiClient.delete(`/users/me/favorites/${wineId}`);
};
