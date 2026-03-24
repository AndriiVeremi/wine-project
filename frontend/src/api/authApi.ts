import apiClient from '@/api/axios';
import type { IRegisterData, UserProfile } from '@/types/auth';

export const registerUserApi = async (userData: IRegisterData) => {
  const response = await apiClient.post('/users/register', userData);
  return response.data;
};

export const getUserProfile = async () => {
  return await apiClient.get<UserProfile>('/users/me');
};

export const updateUserApi = async (data: Partial<UserProfile>) => {
  const response = await apiClient.patch<UserProfile>('/users/me', data);
  return response.data;
};
