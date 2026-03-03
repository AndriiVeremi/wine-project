import { create } from 'zustand';

import { getWines } from '@/api/wines';
import type { Wine, WineQueryParams } from '@/types/wine';

interface WinesStore {
  wines: Wine[];
  loading: boolean;
  error: string | null;
  fetchWines: (params: WineQueryParams) => Promise<void>;
}

export const useWinesStore = create<WinesStore>()((set) => ({
  wines: [],
  loading: false,
  error: null,

  fetchWines: async (params) => {
    set({ loading: true, error: null });

    try {
      const response = await getWines(params);
      set({ wines: response.data.wines, loading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      set({ error: message, loading: false });
    }
  },
}));
