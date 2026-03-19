import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useFavoritesStore } from '@/store/user/useFavoritesStore';
import {
  mockGetUserFavorites,
  mockAddWineToFavorites,
  mockRemoveWineFromFavorites,
} from '../__mocks__/userApi';
import type { WishlistWine } from '@/types/wine';

vi.mock('@/api/userApi', () => ({
  getUserFavorites: (...args: unknown[]) => mockGetUserFavorites(...args),
  addWineToFavorites: (...args: unknown[]) => mockAddWineToFavorites(...args),
  removeWineFromFavorites: (...args: unknown[]) => mockRemoveWineFromFavorites(...args),
}));

vi.mock('@/utils/toast', () => ({
  notifySuccess: vi.fn(),
  notifyError: vi.fn(),
}));

const mockWine: WishlistWine = {
  id: 'wine-1',
  name: 'Cabernet Sauvignon',
  winery: { id: 'winery-1', name: 'Test Winery' },
  imageUrl: 'http://image.url',
  color: 'red',
  sweetness: 'dry',
};

describe('useFavoritesStore', () => {
  beforeEach(() => {
    useFavoritesStore.getState().reset();
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
    const mockFavorites = [mockWine, { ...mockWine, id: 'wine-2', name: 'Merlot' }];
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
    expect(mockAddWineToFavorites).toHaveBeenCalledWith(mockWine.id);
  });

  it('should remove wine from favorites', async () => {
    const { toggleFavorite } = useFavoritesStore.getState();

    mockAddWineToFavorites.mockResolvedValue({});
    await toggleFavorite(mockWine);
    expect(useFavoritesStore.getState().favorites).toContainEqual(mockWine);

    mockRemoveWineFromFavorites.mockResolvedValue({});
    await toggleFavorite(mockWine);

    expect(useFavoritesStore.getState().favorites).not.toContainEqual(mockWine);
    expect(mockRemoveWineFromFavorites).toHaveBeenCalledWith(mockWine.id);
  });

  it('should check if wine is favorite', async () => {
    const { toggleFavorite, isFavorite } = useFavoritesStore.getState();

    expect(isFavorite('wine-1')).toBe(false);

    mockAddWineToFavorites.mockResolvedValue({});
    await toggleFavorite(mockWine);

    expect(isFavorite('wine-1')).toBe(true);
    expect(isFavorite('wine-999')).toBe(false);
  });

  it('should rollback on API error when adding', async () => {
    mockAddWineToFavorites.mockRejectedValue(new Error('API Error'));

    await useFavoritesStore.getState().toggleFavorite(mockWine);

    expect(useFavoritesStore.getState().favorites).not.toContainEqual(mockWine);
  });

  it('should rollback on API error when removing', async () => {
    const { toggleFavorite } = useFavoritesStore.getState();

    mockAddWineToFavorites.mockResolvedValue({});
    await toggleFavorite(mockWine);
    expect(useFavoritesStore.getState().favorites).toContainEqual(mockWine);

    mockRemoveWineFromFavorites.mockRejectedValue(new Error('API Error'));

    await toggleFavorite(mockWine);

    expect(useFavoritesStore.getState().favorites).toContainEqual(mockWine);
  });

  it('should reset favorites', async () => {
    const { toggleFavorite, reset } = useFavoritesStore.getState();

    mockAddWineToFavorites.mockResolvedValue({});
    await toggleFavorite(mockWine);
    expect(useFavoritesStore.getState().favorites).toHaveLength(1);

    reset();

    expect(useFavoritesStore.getState().favorites).toEqual([]);
  });
});
