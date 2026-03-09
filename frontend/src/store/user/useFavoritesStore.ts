import { create } from 'zustand';
import { getUserFavorites, addWineToFavorites, removeWineFromFavorites } from '@/api/userApi';
import type { WishlistWine } from '@/types/wine';

interface FavoritesState {
  favorites: WishlistWine[];
  isLoading: boolean;

  fetchFavorites: () => Promise<void>;
  toggleFavorite: (wine: WishlistWine) => Promise<void>;
  removeFromFavorites: (wineId: string) => Promise<void>;
  isFavorite: (wineId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: JSON.parse(localStorage.getItem('favorites_data') || '[]'),
  isLoading: false,

  fetchFavorites: async () => {
    set({ isLoading: true });

    try {
      const { data } = await getUserFavorites();
      set({ favorites: data, isLoading: false });
      localStorage.setItem('favorites_data', JSON.stringify(data));
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
    localStorage.setItem('favorites_data', JSON.stringify(updated));

    try {
      if (isFav) {
        await removeWineFromFavorites(wine.id);
      } else {
        await addWineToFavorites(wine.id);
      }
    } catch (err) {
      console.error('Failed to update favorites:', err);
      set({ favorites });
      localStorage.setItem('favorites_data', JSON.stringify(favorites));
    }
  },

  removeFromFavorites: async (wineId) => {
    const { favorites } = get();
    const updated = favorites.filter((f) => f.id !== wineId);

    set({ favorites: updated });
    localStorage.setItem('favorites_data', JSON.stringify(updated));

    try {
      await removeWineFromFavorites(wineId);
    } catch (err) {
      console.error('Failed to remove from favorites:', err);
      set({ favorites });
      localStorage.setItem('favorites_data', JSON.stringify(favorites));
    }
  },

  isFavorite: (wineId) => get().favorites.some((f) => f.id === wineId),
}));
