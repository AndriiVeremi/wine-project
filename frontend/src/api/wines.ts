import apiClient from './axios';

import type { WineQueryParams } from '@/types/wine';

export const getWines = (params: WineQueryParams) => {
  return apiClient.get('/wines', { params });
};
