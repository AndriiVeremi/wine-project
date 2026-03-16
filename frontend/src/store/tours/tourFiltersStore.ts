import { create } from 'zustand';

interface TourFiltersState {
  region: string;
  nameInput: string;
  name: string;

  setFilter: (key: keyof TourFiltersState, value: string) => void;
  setNameInput: (value: string) => void;
  applyName: () => void;
  clearFilters: () => void;
}

export const useTourFiltersStore = create<TourFiltersState>()((set) => ({
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
      region: '',
      nameInput: '',
      name: '',
    }),
}));
