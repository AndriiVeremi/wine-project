import apiClient from './axios';
import type { Tour, TourQueryParams, ToursResponse } from '@/types/tours';

export const getTours = (params?: TourQueryParams) =>
  apiClient.get<ToursResponse>('/tours', { params });

export const getTourById = (id: string) => apiClient.get<Tour>(`/tours/${id}`);

export const getToursByWinery = (wineryId: string) =>
  apiClient.get<Tour[]>(`/tours/winery/${wineryId}`);

export const addTour = (data: FormData) =>
  apiClient.post<Tour>('/tours', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const updateTour = (id: string, data: FormData) =>
  apiClient.patch<Tour>(`/tours/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const deleteTour = (id: string) => apiClient.delete(`/tours/${id}`);
