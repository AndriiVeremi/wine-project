import type { WineColor, WineSweetness } from '@/types/wine';
import { create } from 'zustand';

interface FiltersState {
  page: number;
  country: string;
  region: string;
  sweetness: WineSweetness | '';
  color: WineColor | '';
  grape: string;
  wineryId: string;
  minRating: string;
  vintage: string;

  nameInput: string;
  name: string;

  setFilter: (key: keyof FiltersState, value: string | number) => void;

  setNameInput: (value: string) => void;
  applyName: () => void;

  clearFilters: () => void;
}

export const useFiltersStore = create<FiltersState>()((set) => ({
  page: 1,
  country: '',
  region: '',
  sweetness: '',
  color: '',
  grape: '',
  wineryId: '',
  minRating: '',
  vintage: '',

  nameInput: '',
  name: '',

  setFilter: (key, value) =>
    set((state) => ({
      ...state,
      [key]: value,
      page: key === 'page' ? (value as number) : 1,
    })),

  setNameInput: (value) => set({ nameInput: value }),

  applyName: () =>
    set((state) => ({
      name: state.nameInput,
      page: 1,
    })),

  clearFilters: () =>
    set({
      page: 1,
      country: '',
      region: '',
      sweetness: '',
      color: '',
      grape: '',
      wineryId: '',
      minRating: '',
      vintage: '',
      nameInput: '',
      name: '',
    }),
}));
