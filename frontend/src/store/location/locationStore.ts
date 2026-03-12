import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getRegions } from '@/api/regions';

interface RegionOption {
  _id: string;
  name: string;
}

interface LocationState {
  country: string;
  regions: RegionOption[];
  loading: boolean;

  setCountry: (country: string) => void;
  fetchRegions: (country: string) => Promise<void>;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      country: 'Georgia',
      regions: [],
      loading: false,

      setCountry: (country) => {
        set({ country });
      },

      fetchRegions: async (countryName) => {
        if (!countryName) return;
        set({ loading: true });
        try {
          const res = await getRegions(countryName);
          set({ regions: res.data || [], loading: false });
        } catch (err) {
          console.error('Failed to fetch regions', err);
          set({ regions: [], loading: false });
        }
      },
    }),
    {
      name: 'location-storage',
      partialize: (state) => ({ country: state.country }), // Зберігаємо в LocalStorage тільки назву країни
    },
  ),
);
