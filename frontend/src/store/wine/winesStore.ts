import { create } from 'zustand';

import { getWines, addWine, updateWineImage } from '@/api/wines';
import type { Wine, WineQueryParams } from '@/types/wine';

let lastQueryKey: string | null = null;

interface WinesStore {
  wines: Wine[];
  loading: boolean;
  error: string | null;

  page: number;
  limit: number;
  total: number;
  totalPages: number;

  fetchWines: (params: WineQueryParams) => Promise<void>;
  addWine: (
    data: Partial<Wine> & { winery?: string; grape?: string },
    file?: File | null,
  ) => Promise<void>;
}

export const useWinesStore = create<WinesStore>()((set) => ({
  wines: [],
  loading: false,
  error: null,

  page: 1,
  limit: 10,
  total: 0,
  totalPages: 1,

  fetchWines: async (params) => {
    const queryKey = JSON.stringify(params);

    if (queryKey === lastQueryKey) return;
    lastQueryKey = queryKey;

    set({ loading: true, error: null });

    try {
      const response = await getWines(params);
      set({
        wines: response.data.wines,
        page: response.data.page,
        limit: response.data.limit,
        total: response.data.totalCount,
        totalPages: response.data.totalPages,
        loading: false,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      set({ error: message, loading: false });
    }
  },

  addWine: async (data, file) => {
    set({ loading: true, error: null });

    try {
      const response = await addWine(data);
      let newWine = response.data;

      if (file) {
        const imgRes = await updateWineImage(newWine._id, file);
        newWine = imgRes.data;
      }

      set((state) => ({
        wines: [newWine, ...state.wines],
        loading: false,
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      set({ error: message, loading: false });
      throw err;
    }
  },
}));
