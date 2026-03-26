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

apiClient.interceptors.request.use(async (config: PerformanceConfig) => {
  const auth = getAuth();
  const user = auth.currentUser;

  config.metadata = { startTime: performance.now() };

  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    const config = response.config as PerformanceConfig;
    if (config.metadata) {
      const duration = performance.now() - config.metadata.startTime;
      const url = config.url || 'unknown';

      if (import.meta.env.DEV) {
        console.log(`📊 [API Performance] ${url}: ${duration.toFixed(2)}ms`);
      }
    }
    return response;
  },
  (error: AxiosError) => {
    const status = error.response?.status;
    const message = (error.response?.data as { message?: string })?.message || error.message;

    console.error(`API Error [${status}]:`, message);

    return Promise.reject(error);
  },
);

export default apiClient;
