import { create } from 'zustand';
import { getGrapes, addGrape, updateGrapeImages } from '@/api/grapes';
import type { Grape } from '@/types/grape';

interface GrapesStore {
  grapes: Grape[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  totalCount: number;

  fetchGrapes: (params: {
    search?: string;
    type?: string;
    region?: string;
    body?: string;
    acidity?: string;
    page: number;
    limit: number;
  }) => Promise<void>;
  addGrape: (data: Partial<Grape>, files?: File[]) => Promise<void>;
}

export const useGrapesStore = create<GrapesStore>()((set) => ({
  grapes: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  totalCount: 0,

  fetchGrapes: async (params) => {
    set({ loading: true, error: null });
    try {
      const response = await getGrapes(params);
      set({
        grapes: response.data.grapes,
        page: response.data.page,
        totalPages: response.data.totalPages,
        totalCount: response.data.totalCount,
        loading: false,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      set({ error: message, loading: false });
    }
  },

  addGrape: async (data, files) => {
    set({ loading: true, error: null });
    try {
      const res = await addGrape(data);
      let newGrape = res.data;

      if (files && files.length > 0) {
        const imgRes = await updateGrapeImages(newGrape._id, files);
        newGrape = imgRes.data;
      }

      set((state) => ({
        grapes: [newGrape, ...state.grapes],
        loading: false,
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      set({ error: message, loading: false });
      throw err;
    }
  },
}));
