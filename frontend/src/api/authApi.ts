import apiClient from './axios';
import type { IRegisterData } from '../types/auth';

export const registerUserApi = async (userData: IRegisterData) => {
  try {
    const response = await apiClient.post('/users/register', userData);
    return response.data;
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'response' in error) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      if (axiosError.response && axiosError.response.data) {
        throw axiosError.response.data;
      }
    }
    throw { message: 'An unknown network error occurred' };
  }
};
