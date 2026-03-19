import { create } from 'zustand';
import { getUserFavorites, addWineToFavorites, removeWineFromFavorites } from '@/api/userApi';
import type { WishlistWine } from '@/types/wine';
import { notifySuccess, notifyError } from '@/utils/toast';

interface FavoritesState {
  favorites: WishlistWine[];
  isLoading: boolean;
  fetchFavorites: () => Promise<void>;
  toggleFavorite: (wine: WishlistWine) => Promise<void>;
  isFavorite: (wineId: string) => boolean;
  reset: () => void;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  isLoading: false,

  fetchFavorites: async () => {
    set({ isLoading: true });
    try {
      const { data } = await getUserFavorites();
      set({ favorites: data, isLoading: false });
    } catch {
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
      notifyError('Failed to update favorites');
      set({ favorites });
    }
  },

  isFavorite: (id) => get().favorites.some((f) => f.id === id),

  reset: () => set({ favorites: [] }),
}));
