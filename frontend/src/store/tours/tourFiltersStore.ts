import { create } from 'zustand';

interface TourFiltersState {
  page: number;
  region: string;
  nameInput: string;
  name: string;

  setFilter: (key: keyof TourFiltersState, value: string | number) => void;
  setNameInput: (value: string) => void;
  applyName: () => void;
  clearFilters: () => void;
}

export const useTourFiltersStore = create<TourFiltersState>()((set) => ({
  page: 1,
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
      region: '',
      nameInput: '',
      name: '',
    }),
}));
