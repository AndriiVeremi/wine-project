import apiClient from './axios';
import type { Winery, WineriesQueryParams } from '@/types/wineries';

export const getWineries = (params?: WineriesQueryParams) => {
  return apiClient.get('/wineries', { params });
};

export const getWineryById = (id: string) => {
  return apiClient.get(`/wineries/${id}`);
};

export const addWinery = (data: FormData | Partial<Winery>) => {
  return apiClient.post('/wineries', data);
};

export const updateWinery = (id: string, data: FormData | Partial<Winery>) => {
  return apiClient.patch(`/wineries/${id}`, data);
};

export const deleteWinery = (id: string) => {
  return apiClient.delete(`/wineries/${id}`);
};

export const toggleWineryVip = (id: string) => {
  return apiClient.patch(`/wineries/${id}/vip`);
};
