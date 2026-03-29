import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getFavorites, addWineToFavorites, removeWineFromFavorites } from '@/api/userApi';
import type { Wine } from '@/types/wine';

interface FavoritesState {
  favorites: Wine[];
  isLoading: boolean;
  error: string | null;
  fetchFavorites: () => Promise<void>;
  toggleFavorite: (wine: Wine) => Promise<void>;
  isFavorite: (wineId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      isLoading: false,
      error: null,

      fetchFavorites: async () => {
        set({ isLoading: true, error: null });
        try {
          const res = await getFavorites();
          set({ favorites: res.data, isLoading: false });
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : 'Unknown error';
          set({ error: message, isLoading: false });
        }
      },

      toggleFavorite: async (wine) => {
        const { favorites } = get();
        const exists = favorites.some((f) => f._id === wine._id);

        try {
          if (exists) {
            await removeWineFromFavorites(wine._id);
            set({ favorites: favorites.filter((f) => f._id !== wine._id) });
          } else {
            await addWineToFavorites(wine._id);
            set({ favorites: [...favorites, wine] });
          }
        } catch (err: unknown) {
          console.error('Failed to toggle favorite', err);
        }
      },

      isFavorite: (wineId) => {
        return get().favorites.some((f) => f._id === wineId);
      },
    }),
    {
      name: 'wine-favorites',
      partialize: (state) => ({ favorites: state.favorites }),
    },
  ),
);
