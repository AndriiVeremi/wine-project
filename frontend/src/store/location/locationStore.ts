import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LocationState {
  country: string;
  setCountry: (country: string) => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      country: 'Georgia', // За замовчуванням
      setCountry: (country) => set({ country }),
    }),
    {
      name: 'location-storage', // Зберігаємо вибір користувача в LocalStorage
    },
  ),
);
