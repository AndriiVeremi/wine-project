import { create } from 'zustand';

interface FiltersState {
  region: string;
  type: string;
  color: string;
  grape: string;
  winery: string;
  rating: string;
  vintage: string;

  setFilter: (key: keyof FiltersState, value: string) => void;
  clearFilters: () => void;
}

export const useFiltersStore = create<FiltersState>()((set) => ({
  region: '',
  type: '',
  color: '',
  grape: '',
  winery: '',
  rating: '',
  vintage: '',

  setFilter: (key, value) =>
    set((state) => ({
      ...state,
      [key]: value,
    })),

  clearFilters: () =>
    set({
      color: '',
      region: '',
      grape: '',
      winery: '',
      rating: '',
      vintage: '',
    }),
}));
