import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useFavoritesStore } from '@/store/user/useFavoritesStore';
import {
  mockGetUserFavorites,
  mockAddWineToFavorites,
  mockRemoveWineFromFavorites,
} from '../__mocks__/userApi';
import type { Wine } from '@/types/wine';

vi.mock('@/api/userApi', () => ({
  getFavorites: (...args: unknown[]) => mockGetUserFavorites(...args),
  addWineToFavorites: (...args: unknown[]) => mockAddWineToFavorites(...args),
  removeWineFromFavorites: (...args: unknown[]) => mockRemoveWineFromFavorites(...args),
}));

const mockWine: Wine = {
  _id: 'wine-1',
  name: 'Cabernet Sauvignon',
  winery: { _id: 'winery-1', name: 'Test Winery' },
  vintage: 2020,
  grape: { _id: 'grape-1', name: 'Cabernet' },
  description: 'Test desc',
  tastingNotes: [],
  imageUrl: 'http://image.url',
  color: 'red',
  sweetness: 'dry',
  averageRating: 4.5,
  price: 50,
};

describe('useFavoritesStore', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ favorites: [], isLoading: false, error: null });
    vi.clearAllMocks();
    mockGetUserFavorites.mockReset();
    mockAddWineToFavorites.mockReset();
    mockRemoveWineFromFavorites.mockReset();
  });

  it('should have initial empty favorites', () => {
    const { favorites, isLoading } = useFavoritesStore.getState();
    expect(favorites).toEqual([]);
    expect(isLoading).toBe(false);
  });

  it('should fetch favorites', async () => {
    const mockFavorites = [mockWine, { ...mockWine, _id: 'wine-2', name: 'Merlot' }];
    mockGetUserFavorites.mockResolvedValue({
      data: mockFavorites,
    });

    await useFavoritesStore.getState().fetchFavorites();

    expect(mockGetUserFavorites).toHaveBeenCalled();
    expect(useFavoritesStore.getState().favorites).toEqual(mockFavorites);
    expect(useFavoritesStore.getState().isLoading).toBe(false);
  });

  it('should add wine to favorites', async () => {
    mockAddWineToFavorites.mockResolvedValue({});

    await useFavoritesStore.getState().toggleFavorite(mockWine);

    expect(useFavoritesStore.getState().favorites).toContainEqual(mockWine);
    expect(mockAddWineToFavorites).toHaveBeenCalledWith(mockWine._id);
  });

  it('should remove wine from favorites', async () => {
    const { toggleFavorite } = useFavoritesStore.getState();

    mockAddWineToFavorites.mockResolvedValue({});
    await toggleFavorite(mockWine);
    expect(useFavoritesStore.getState().favorites).toHaveLength(1);

    mockRemoveWineFromFavorites.mockResolvedValue({});
    await toggleFavorite(mockWine);

    expect(useFavoritesStore.getState().favorites).toHaveLength(0);
    expect(mockRemoveWineFromFavorites).toHaveBeenCalledWith(mockWine._id);
  });

  it('should check if wine is favorite', async () => {
    const { toggleFavorite, isFavorite } = useFavoritesStore.getState();

    expect(isFavorite('wine-1')).toBe(false);

    mockAddWineToFavorites.mockResolvedValue({});
    await toggleFavorite(mockWine);

    expect(isFavorite('wine-1')).toBe(true);
    expect(isFavorite('wine-999')).toBe(false);
  });
});
