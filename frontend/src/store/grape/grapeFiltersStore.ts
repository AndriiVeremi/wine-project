import { create } from 'zustand';

interface GrapeFiltersState {
  page: number;
  type: string;
  region: string;
  body: string;
  acidity: string;

  nameInput: string;
  name: string;

  setFilter: (
    key: keyof Omit<
      GrapeFiltersState,
      'nameInput' | 'name' | 'setFilter' | 'setNameInput' | 'applyName' | 'clearFilters'
    >,
    value: string | number,
  ) => void;
  setNameInput: (value: string) => void;
  applyName: () => void;
  clearFilters: () => void;
}

export const useGrapeFiltersStore = create<GrapeFiltersState>()((set) => ({
  page: 1,
  type: '',
  region: '',
  body: '',
  acidity: '',

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
      type: '',
      region: '',
      body: '',
      acidity: '',
      nameInput: '',
      name: '',
    }),
}));
