import { create } from 'zustand';
import { getTours, addTour, updateTour, deleteTour } from '@/api/tours';
import type { Tour, TourQueryParams } from '@/types/tours';

interface ToursStore {
  tours: Tour[];
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  total: number;
  totalPages: number;

  fetch: (params: TourQueryParams) => Promise<void>;
  add: (data: FormData) => Promise<void>;
  update: (id: string, data: FormData) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export const useToursStore = create<ToursStore>()((set) => ({
  tours: [],
  loading: false,
  error: null,

  page: 1,
  limit: 10,
  total: 0,
  totalPages: 1,

  fetch: async (params) => {
    set({ loading: true, error: null });
    try {
      const res = await getTours(params);
      set({
        tours: res.data.tours,
        page: res.data.page,
        limit: res.data.limit,
        total: res.data.totalCount,
        totalPages: res.data.totalPages,
        loading: false,
      });
    } catch (err: unknown) {
      const axiosError = err as ApiError;
      const message = axiosError.response?.data?.message || axiosError.message || 'Unknown error';
      set({ error: message, loading: false });
    }
  },

  add: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await addTour(data);
      set((state) => ({
        tours: [res.data, ...state.tours],
        loading: false,
      }));
    } catch (err: unknown) {
      const axiosError = err as ApiError;
      const message = axiosError.response?.data?.message || axiosError.message || 'Unknown error';
      set({ error: message, loading: false });
    }
  },

  update: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const res = await updateTour(id, data);
      set((state) => ({
        tours: state.tours.map((t) => (t._id === id ? res.data : t)),
        loading: false,
      }));
    } catch (err: unknown) {
      const axiosError = err as ApiError;
      const message = axiosError.response?.data?.message || axiosError.message || 'Unknown error';
      set({ error: message, loading: false });
    }
  },

  remove: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteTour(id);
      set((state) => ({
        tours: state.tours.filter((t) => t._id !== id),
        loading: false,
      }));
    } catch (err: unknown) {
      const axiosError = err as ApiError;
      const message = axiosError.response?.data?.message || axiosError.message || 'Unknown error';
      set({ error: message, loading: false });
    }
  },
}));
