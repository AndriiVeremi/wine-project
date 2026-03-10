import { create } from 'zustand';

interface GrapeFiltersState {
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
    value: string,
  ) => void;
  setNameInput: (value: string) => void;
  applyName: () => void;
  clearFilters: () => void;
}

export const useGrapeFiltersStore = create<GrapeFiltersState>()((set) => ({
  type: '',
  region: '',
  body: '',
  acidity: '',

  nameInput: '',
  name: '',

  setFilter: (key, value) => set((state) => ({ ...state, [key]: value })),

  setNameInput: (value) => set({ nameInput: value }),

  applyName: () => set((state) => ({ name: state.nameInput })),

  clearFilters: () =>
    set({
      type: '',
      region: '',
      body: '',
      acidity: '',
      nameInput: '',
      name: '',
    }),
}));
