import axios, { type AxiosError } from 'axios';
import { getAuth } from 'firebase/auth';
import { notifyError } from '@/utils/toast';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const message = (error.response?.data as { message?: string })?.message || error.message;

    switch (status) {
      case 401:
        break;
      case 403:
        notifyError('Access denied');
        break;
      case 404:
        break;
      case 500:
        notifyError('Server error. Please try again later.');
        break;
      default:
        if (!error.config?.url?.includes('/auth/')) {
          notifyError(message);
        }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
