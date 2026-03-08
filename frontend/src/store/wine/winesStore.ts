import { create } from 'zustand';

import { getWines, addWine } from '@/api/wines';
import type { Wine, WineQueryParams } from '@/types/wine';

let lastQueryKey: string | null = null;

interface WinesStore {
  wines: Wine[];
  loading: boolean;
  error: string | null;
  fetchWines: (params: WineQueryParams) => Promise<void>;
  addWine: (data: Partial<Wine>) => Promise<void>;
}

export const useWinesStore = create<WinesStore>()((set) => ({
  wines: [],
  loading: false,
  error: null,

  fetchWines: async (params) => {
    const queryKey = JSON.stringify(params);

    if (queryKey === lastQueryKey) return;
    lastQueryKey = queryKey;

    set({ loading: true, error: null });

    try {
      const response = await getWines(params);
      set({ wines: response.data.wines, loading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      set({ error: message, loading: false });
    }
  },

  addWine: async (data) => {
    set({ loading: true, error: null });

    try {
      const response = await addWine(data);
      const newWine = response.data;
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
