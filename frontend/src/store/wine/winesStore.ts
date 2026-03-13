import { create } from 'zustand';
import { getWines, addWine, updateWine, deleteWine } from '@/api/wines';
import type { Wine, WineQueryParams } from '@/types/wine';

interface WinesStore {
  wines: Wine[];
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  total: number;
  totalPages: number;

  fetch: (params: WineQueryParams) => Promise<void>;
  add: (data: FormData) => Promise<void>;
  update: (id: string, data: FormData) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

export const useWinesStore = create<WinesStore>()((set) => ({
  wines: [],
  loading: false,
  error: null,

  page: 1,
  limit: 10,
  total: 0,
  totalPages: 1,

  fetch: async (params) => {
    set({ loading: true, error: null });
    try {
      const res = await getWines(params);
      set({
        wines: res.data.wines,
        page: res.data.page,
        limit: res.data.limit,
        total: res.data.totalCount,
        totalPages: res.data.totalPages,
        loading: false,
      });
    } catch (err: unknown) {
      const axiosError = err as any;
      const message = axiosError.response?.data?.message || axiosError.message || 'Unknown error';
      set({ error: message, loading: false });
    }
  },

  add: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await addWine(data);
      set((state) => ({
        wines: [res.data, ...state.wines],
        loading: false,
      }));
    } catch (err: unknown) {
      const axiosError = err as any;
      const message = axiosError.response?.data?.message || axiosError.message || 'Unknown error';
      set({ error: message, loading: false });
      throw err;
    }
  },

  update: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const res = await updateWine(id, data);
      set((state) => ({
        wines: state.wines.map((w) => (w._id === id ? res.data : w)),
        loading: false,
      }));
    } catch (err: unknown) {
      const axiosError = err as any;
      const message = axiosError.response?.data?.message || axiosError.message || 'Unknown error';
      set({ error: message, loading: false });
      throw err;
    }
  },

  remove: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteWine(id);
      set((state) => ({
        wines: state.wines.filter((w) => w._id !== id),
        loading: false,
      }));
    } catch (err: unknown) {
      const axiosError = err as any;
      const message = axiosError.response?.data?.message || axiosError.message || 'Unknown error';
      set({ error: message, loading: false });
      throw err;
    }
  },
}));
