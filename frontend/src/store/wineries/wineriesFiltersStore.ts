import { create } from 'zustand';

interface WineriesFiltersState {
  page: number;
  country: string;
  region: string;
  nameInput: string;
  name: string;

  setFilter: (key: keyof WineriesFiltersState, value: string | number) => void;
  setNameInput: (value: string) => void;
  applyName: () => void;
  clearFilters: () => void;
}

export const useWineriesFiltersStore = create<WineriesFiltersState>((set) => ({
  page: 1,
  country: 'Georgia',
  region: '',
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
      country: 'Georgia',
      region: '',
      nameInput: '',
      name: '',
    }),
}));
