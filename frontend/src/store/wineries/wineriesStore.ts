import { create } from 'zustand';
import { getWineries, addWinery, updateWinery } from '@/api/wineries';
import type { Winery, WineriesQueryParams } from '@/types/wineries';

interface WineriesStore {
  wineries: Winery[];
  loading: boolean;
  error: string | null;
  page: number;
  total: number;
  totalPages: number;

  fetchWineries: (params?: WineriesQueryParams) => Promise<void>;
  add: (data: FormData | Partial<Winery>) => Promise<void>;
  update: (id: string, data: FormData | Partial<Winery>) => Promise<void>;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
      errors?: { message: string }[];
    };
  };
  message?: string;
}

export const useWineriesStore = create<WineriesStore>((set) => ({
  wineries: [],
  loading: false,
  error: null,
  page: 1,
  total: 0,
  totalPages: 1,

  fetchWineries: async (params) => {
    set({ loading: true, error: null });
    try {
      const res = await getWineries(params);
      set({
        wineries: res.data.wineries || res.data,
        page: res.data.page || 1,
        total: res.data.totalCount || res.data.length,
        totalPages: res.data.totalPages || 1,
        loading: false,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      set({ error: message, loading: false });
    }
  },

  add: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await addWinery(data);
      set((state) => ({
        wineries: [res.data, ...state.wineries],
        loading: false,
      }));
    } catch (err: unknown) {
      const axiosError = err as ApiError;
      let msg = axiosError.response?.data?.message || axiosError.message || 'Unknown error';
      if (axiosError.response?.data?.errors && axiosError.response.data.errors.length > 0) {
        msg = axiosError.response.data.errors[0].message;
      }
      set({ error: msg, loading: false });
    }
  },

  update: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const res = await updateWinery(id, data);
      set((state) => ({
        wineries: state.wineries.map((w) => (w._id === id ? res.data : w)),
        loading: false,
      }));
    } catch (err: unknown) {
      const axiosError = err as ApiError;
      let msg = axiosError.response?.data?.message || axiosError.message || 'Unknown error';
      if (axiosError.response?.data?.errors && axiosError.response.data.errors.length > 0) {
        msg = axiosError.response.data.errors[0].message;
      }
      set({ error: msg, loading: false });
    }
  },
}));
