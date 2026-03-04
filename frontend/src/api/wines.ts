import apiClient from './axios';

import type { WineQueryParams } from '@/types/wine';

export const getWines = (params: WineQueryParams) => {
  return apiClient.get('/wines', { params });
};

export const getWineById = (id: string) => {
  return apiClient.get(`/wines/${id}`);
};
