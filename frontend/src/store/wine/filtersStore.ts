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

  nameInput: string;
  name: string;

  setFilter: (key: keyof FiltersState, value: string) => void;

  setNameInput: (value: string) => void;
  applyName: () => void;

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

  nameInput: '',
  name: '',

  setFilter: (key, value) =>
    set((state) => ({
      ...state,
      [key]: value,
    })),

  setNameInput: (value) => set({ nameInput: value }),

  applyName: () =>
    set((state) => ({
      name: state.nameInput,
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
      nameInput: '',
      name: '',
    }),
}));
