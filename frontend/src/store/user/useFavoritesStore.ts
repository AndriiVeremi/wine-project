import { create } from 'zustand';
import { getUserFavorites, addWineToFavorites, removeWineFromFavorites } from '@/api/userApi';

interface FavoritesState {
  favorites: string[];
  isLoading: boolean;

  fetchFavorites: () => Promise<void>;
  toggleFavorite: (wineId: string) => Promise<void>;
  isFavorite: (wineId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  isLoading: false,

  fetchFavorites: async () => {
    set({ isLoading: true });

    try {
      const { data } = await getUserFavorites();

      const ids = data.map((wine) => wine.id);

      set({ favorites: ids, isLoading: false });
      localStorage.setItem('favorites', JSON.stringify(ids));
    } catch (err) {
      console.error('Failed to load favorites:', err);
      set({ isLoading: false });
    }
  },

  toggleFavorite: async (wineId) => {
    const { favorites } = get();
    const isFav = favorites.includes(wineId);

    const updated = isFav ? favorites.filter((id) => id !== wineId) : [...favorites, wineId];

    set({ favorites: updated });
    localStorage.setItem('favorites', JSON.stringify(updated));

    try {
      if (isFav) {
        await removeWineFromFavorites(wineId);
      } else {
        await addWineToFavorites(wineId);
      }
    } catch (err) {
      console.error('Failed to update favorites:', err);

      set({ favorites });
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  },

  isFavorite: (wineId) => get().favorites.includes(wineId),
}));
