import { create } from 'zustand';
import { getWineries, addWinery } from '@/api/wineries';
import type { Winery, WineriesQueryParams } from '@/types/wineries';

interface WineriesStore {
  wineries: Winery[];
  loading: boolean;
  error: string | null;
  page: number;
  total: number;
  totalPages: number;

  fetchWineries: (params?: WineriesQueryParams) => Promise<void>;
  addWinery: (data: Partial<Winery>) => Promise<void>;
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
      const response = await getWineries(params);
      set({
        wineries: response.data.wineries || response.data,
        page: response.data.page || 1,
        total: response.data.totalCount || response.data.length,
        totalPages: response.data.totalPages || 1,
        loading: false,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error fetching wineries';
      set({ error: message, loading: false });
    }
  },

  addWinery: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await addWinery(data);
      set((state) => ({
        wineries: [response.data, ...state.wineries],
        loading: false,
      }));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error adding winery';
      set({ error: message, loading: false });
      throw err;
    }
  },
}));
