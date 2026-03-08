import type { WineColor, WineSweetness } from '@/types/wine';
import { create } from 'zustand';

interface FiltersState {
  region: string;
  sweetness: WineSweetness | '';
  color: WineColor | '';
  grape: string;
  wineryId: string;
  minRating: string;
  vintage: string;

  setFilter: (key: keyof FiltersState, value: string) => void;
  clearFilters: () => void;
}

export const useFiltersStore = create<FiltersState>()((set) => ({
  region: '',
  sweetness: '',
  color: '',
  grape: '',
  wineryId: '',
  minRating: '',
  vintage: '',

  setFilter: (key, value) =>
    set((state) => ({
      ...state,
      [key]: value,
    })),

  clearFilters: () =>
    set({
      region: '',
      sweetness: '',
      color: '',
      grape: '',
      wineryId: '',
      minRating: '',
      vintage: '',
    }),
}));
