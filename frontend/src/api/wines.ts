import apiClient from './axios';

import type { Wine, WineQueryParams } from '@/types/wine';

export const getWines = (params: WineQueryParams) => {
  return apiClient.get('/wines', { params });
};

export const getWineById = (id: string) => {
  return apiClient.get(`/wines/${id}`);
};

export const addWine = (data: Partial<Wine>) => {
  return apiClient.post('/wines', data);
};
