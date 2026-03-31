import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { getAuth } from 'firebase/auth';

interface PerformanceConfig extends InternalAxiosRequestConfig {
  metadata?: {
    startTime: number;
  };
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

const auth = getAuth();

apiClient.interceptors.request.use(async (config: PerformanceConfig) => {
  config.metadata = { startTime: performance.now() };

  try {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('❌ [Auth Token Error]:', error);
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      const config = response.config as PerformanceConfig;
      if (config.metadata) {
        const duration = performance.now() - config.metadata.startTime;
        const url = config.url || 'unknown';
        if (duration > 1000) {
          console.warn(`🐢 [Slow API] ${url}: ${duration.toFixed(2)}ms`);
        }
      }
    }
    return response;
  },
  (error: AxiosError) => {
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    if (import.meta.env.DEV) {
      const status = error.response?.status;
      const message = (error.response?.data as { message?: string })?.message || error.message;
      if (status !== 401) {
        console.error(`❌ [API Error] ${status || 'Network'}:`, message);
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
