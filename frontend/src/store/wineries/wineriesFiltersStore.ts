import { create } from 'zustand';

interface WineriesFiltersState {
  country: string;
  region: string;
  nameInput: string;
  name: string;

  setFilter: (key: keyof WineriesFiltersState, value: string) => void;
  setNameInput: (value: string) => void;
  applyName: () => void;
  clearFilters: () => void;
}

export const useWineriesFiltersStore = create<WineriesFiltersState>((set) => ({
  country: 'Georgia',
  region: '',
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
      country: 'Georgia',
      region: '',
      nameInput: '',
      name: '',
    }),
}));
