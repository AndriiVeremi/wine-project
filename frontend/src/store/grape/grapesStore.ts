import { create } from 'zustand';
import { getGrapes, addGrape, updateGrape, deleteGrape, updateGrapeImages } from '@/api/grapes';
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
    wineryId?: string;
  }) => Promise<void>;
  add: (data: Partial<Grape>, files?: File[]) => Promise<void>;
  update: (id: string, data: Partial<Grape>, files?: File[]) => Promise<void>;
  removeGrape: (id: string) => Promise<void>;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
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
    } catch (err: unknown) {
      const e = err as ApiError;
      set({ error: e.response?.data?.message || e.message, loading: false });
    }
  },

  add: async (data, files) => {
    set({ loading: true, error: null });
    try {
      const res = await addGrape(data);
      let item = res.data;
      if (files && files.length > 0) {
        const imgRes = await updateGrapeImages(item._id, files);
        item = imgRes.data;
      }
      set((s) => ({ grapes: [item, ...s.grapes], loading: false }));
    } catch (err: unknown) {
      const e = err as ApiError;
      set({ error: e.response?.data?.message || e.message, loading: false });
    }
  },

  update: async (id, data, files) => {
    set({ loading: true, error: null });
    try {
      const res = await updateGrape(id, data);
      let item = res.data;
      if (files && files.length > 0) {
        const imgRes = await updateGrapeImages(id, files);
        item = imgRes.data;
      }
      set((s) => ({
        grapes: s.grapes.map((g) => (g._id === id ? item : g)),
        loading: false,
      }));
    } catch (err: unknown) {
      const e = err as ApiError;
      set({ error: e.response?.data?.message || e.message, loading: false });
    }
  },

  removeGrape: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteGrape(id);
      set((s) => ({
        grapes: s.grapes.filter((g) => g._id !== id),
        loading: false,
      }));
    } catch (err: unknown) {
      const e = err as ApiError;
      set({ error: e.response?.data?.message || e.message, loading: false });
    }
  },
}));
