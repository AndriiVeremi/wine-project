import apiClient from '@/api/axios';
import type { IRegisterData, UserProfile } from '@/types/auth';

export const registerUser = async (userData: IRegisterData) => {
  const response = await apiClient.post('/users/register', userData);
  return response.data;
};

export const loginUser = async (email: string, pass: string) => {
  // Ця функція використовується у вашому authStore.ts
  // Якщо ви використовуєте Firebase для входу на фронті, вона може бути заглушкою
  // або викликом на бекенд, якщо у вас є такий ендпоінт.
  return { email, pass }; 
};

export const getUserProfile = async () => {
  return await apiClient.get<UserProfile>('/users/me');
};

export const updateUserApi = async (data: Partial<UserProfile>) => {
  const response = await apiClient.patch<UserProfile>('/users/me', data);
  return response.data;
};
