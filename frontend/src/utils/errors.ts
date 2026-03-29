import type { AxiosError } from 'axios';
import type { ApiError } from '@/types/api';

export const getApiErrorMessage = (err: unknown): string => {
  const error = err as AxiosError<ApiError['response']['data']>;

  if (error.response?.data?.errors?.length) {
    return error.response.data.errors[0].message;
  }

  return error.response?.data?.message || error.message || 'Something went wrong. Try again!';
};

export const isNetworkError = (err: unknown): boolean => {
  const error = err as AxiosError;
  return error.code === 'ERR_NETWORK' || !error.response;
};

export const isAuthError = (err: unknown): boolean => {
  const error = err as AxiosError;
  return error.response?.status === 401;
};

export const isForbiddenError = (err: unknown): boolean => {
  const error = err as AxiosError;
  return error.response?.status === 403;
};

export const isNotFoundError = (err: unknown): boolean => {
  const error = err as AxiosError;
  return error.response?.status === 404;
};

export const isServerError = (err: unknown): boolean => {
  const error = err as AxiosError;
  return error.response?.status === 500;
};

export const isValidationError = (err: unknown): boolean => {
  const error = err as AxiosError<ApiErrorResponse>;
  return (
    error.response?.status === 400 ||
    (error.response?.data?.errors !== undefined && error.response?.data?.errors.length > 0)
  );
};
