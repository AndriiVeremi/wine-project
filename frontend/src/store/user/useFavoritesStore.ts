import { create } from 'zustand';
import { persist, createJSONStorage, subscribeWithSelector } from 'zustand/middleware';
import { getUserFavorites, addWineToFavorites, removeWineFromFavorites } from '@/api/userApi';
import type { WishlistWine } from '@/types/wine';
import { useAuthStore } from '../auth/authStore';
import { notifyError, notifySuccess } from '@/utils/toast';

interface FavoritesState {
  favorites: WishlistWine[];
  isLoading: boolean;
  fetchFavorites: () => Promise<void>;
  toggleFavorite: (wine: WishlistWine) => Promise<void>;
  removeFromFavorites: (wineId: string) => Promise<void>;
  isFavorite: (wineId: string) => boolean;
  reset: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        favorites: [],
        isLoading: false,

        fetchFavorites: async () => {
          set({ isLoading: true });
          try {
            const { data } = await getUserFavorites();
            set({ favorites: data, isLoading: false });
          } catch (err) {
            console.error('Failed to load favorites:', err);
            set({ isLoading: false });
          }
        },

        toggleFavorite: async (wine) => {
          const { favorites } = get();
          const isFav = favorites.some((f) => f.id === wine.id);
          const updated = isFav ? favorites.filter((f) => f.id !== wine.id) : [...favorites, wine];
          set({ favorites: updated });

          if (isFav) {
            notifySuccess('Removed from favorites');
          } else {
            notifySuccess('Added to favorites');
          }

          try {
            if (isFav) await removeWineFromFavorites(wine.id);
            else await addWineToFavorites(wine.id);
          } catch {
            notifyError('Something went wrong. Please try again.');
            set({ favorites });
          }
        },

        removeFromFavorites: async (wineId) => {
          const { favorites } = get();
          const updated = favorites.filter((f) => f.id !== wineId);
          set({ favorites: updated });

          notifySuccess('Removed from favorites');

          try {
            await removeWineFromFavorites(wineId);
          } catch {
            notifyError('Something went wrong. Please try again.');
            set({ favorites });
          }
        },

        isFavorite: (wineId) => get().favorites.some((f) => f.id === wineId),

        reset: () => {
          set({ favorites: [] });
        },
      }),
      {
        name: 'favorites_data',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);

export const bindFavoritesToAuth = () => {
  useAuthStore.subscribe(
    (state) => state.user,
    (user) => {
      if (!user) {
        useFavoritesStore.getState().reset();
      }
    },
    { fireImmediately: true },
  );
};
