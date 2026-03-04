import { create } from 'zustand';
import { getWineById } from '@/api/wines';
import type { Wine } from '@/types/wine';

interface WineDetailStore {
  wine: Wine | null;
  loading: boolean;
  error: string | null;
  fetchWine: (id: string) => Promise<void>;
}

export const useWineDetailStore = create<WineDetailStore>()((set) => ({
  wine: null,
  loading: false,
  error: null,

  fetchWine: async (id) => {
    set({ loading: true, error: null });

    try {
      const response = await getWineById(id);
      set({ wine: response.data, loading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      set({ error: message, loading: false });
    }
  },
}));
