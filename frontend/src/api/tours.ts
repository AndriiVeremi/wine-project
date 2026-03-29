import apiClient from './axios';
import type { Tour, TourQueryParams, ToursResponse } from '@/types/tours';

export const getTours = (params?: TourQueryParams, signal?: AbortSignal) =>
  apiClient.get<ToursResponse>('/tours', { params, signal });

export const getTourById = (id: string, signal?: AbortSignal) =>
  apiClient.get<Tour>(`/tours/${id}`, { signal });

export const getToursByWinery = (wineryId: string, signal?: AbortSignal) =>
  apiClient.get<Tour[]>(`/tours/winery/${wineryId}`, { signal });

export const addTour = (data: FormData) =>
  apiClient.post<Tour>('/tours', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const updateTour = (id: string, data: FormData) =>
  apiClient.patch<Tour>(`/tours/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const deleteTour = (id: string) => apiClient.delete(`/tours/${id}`);
