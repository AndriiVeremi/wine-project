import apiClient from './axios';
import type { Wine, WineQueryParams } from '@/types/wine';

export const getWines = (params: WineQueryParams, signal?: AbortSignal) => {
  return apiClient.get<{ wines: Wine[]; total: number }>('/wines', { params, signal });
};

export const getWineById = (id: string, signal?: AbortSignal) => {
  return apiClient.get<Wine>(`/wines/${id}`, { signal });
};

export const addWine = (data: FormData | Partial<Wine>) => {
  return apiClient.post<Wine>('/wines', data);
};

export const updateWine = (id: string, data: FormData | Partial<Wine>) => {
  return apiClient.patch<Wine>(`/wines/${id}`, data);
};

export const updateWineImage = (id: string, file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  return apiClient.patch<{ imageUrl: string }>(`/wines/${id}/image`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteWine = (id: string) => {
  return apiClient.delete<void>(`/wines/${id}`);
};
