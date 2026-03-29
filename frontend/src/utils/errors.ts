import type { AxiosError } from 'axios';
import type { ApiError } from '@/types/api';

export const getApiErrorMessage = (err: unknown): string => {
  const error = err as AxiosError<ApiError['response'] extends { data: infer D } ? D : any>;

  const data = error.response?.data;

  if (data && typeof data === 'object') {
    if ('errors' in data && Array.isArray(data.errors) && data.errors.length > 0) {
      return data.errors[0].message;
    }
    if ('message' in data && typeof data.message === 'string') {
      return data.message;
    }
  }

  return error.message || 'Something went wrong. Try again!';
};

export const isNetworkError = (err: unknown): boolean => {
  const error = err as AxiosError;
  return !error.response && !!error.request;
};

export const isServerError = (err: unknown): boolean => {
  const error = err as AxiosError;
  return !!error.response && error.response.status >= 500;
};
