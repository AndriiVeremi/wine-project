import apiClient from './axios';
import type { Grape } from '@/types/grape';

export const getGrapes = (params: {
  search?: string;
  type?: string;
  page?: number;
  limit?: number;
}) => {
  return apiClient.get('/grapes', { params });
};

export const addGrape = (data: Partial<Grape>) => {
  return apiClient.post('/grapes', data);
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
