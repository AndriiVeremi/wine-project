import apiClient from './axios';
import type { Grape } from '@/types/grape';

export const getGrapes = (params: {
  search?: string;
  type?: string;
  region?: string;
  body?: string;
  acidity?: string;
  page?: number;
  limit?: number;
  wineryId?: string;
}) => {
  return apiClient.get('/grapes', { params });
};

export const getGrapeById = (id: string) => {
  return apiClient.get<Grape>(`/grapes/${id}`);
};

export const addGrape = (data: FormData | Partial<Grape>) => {
  return apiClient.post('/grapes', data);
};

export const updateGrape = (id: string, data: FormData | Partial<Grape>) => {
  return apiClient.patch(`/grapes/${id}`, data);
};

export const deleteGrape = (id: string) => {
  return apiClient.delete(`/grapes/${id}`);
};

export const updateGrapeImages = (id: string, files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('images', file);
  });
  return apiClient.patch(`/grapes/${id}/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
