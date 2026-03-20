import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useWinesStore } from '@/store/wine/winesStore';
import * as winesApi from '@/api/wines';

vi.mock('@/api/wines');

const mockWine = {
  _id: 'wine-1',
  name: 'Cabernet Sauvignon',
  winery: { _id: 'win-1', name: 'Test Winery' },
  grape: { _id: 'grape-1', name: 'Cabernet' },
  vintage: 2020,
  color: 'red',
  sweetness: 'dry',
  price: 500,
  imageUrl: 'http://test.com/img.jpg',
  averageRating: 4.5,
};

describe('winesStore', () => {
  beforeEach(() => {
    useWinesStore.setState({
      wines: [],
      loading: false,
      error: null,
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 1,
    });
    vi.clearAllMocks();
  });

  it('should have empty initial state', () => {
    const state = useWinesStore.getState();
    expect(state.wines).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  it('should fetch wines successfully', async () => {
    const mockResponse = {
      data: {
        wines: [mockWine],
        page: 1,
        limit: 10,
        totalCount: 1,
        totalPages: 1,
      },
    };
    (winesApi.getWines as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);

    await useWinesStore.getState().fetch({});

    const state = useWinesStore.getState();
    expect(state.wines).toEqual([mockWine]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  it('should set error on fetch fail', async () => {
    (winesApi.getWines as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Server error'));

    await useWinesStore.getState().fetch({});

    const state = useWinesStore.getState();
    expect(state.error).toBe('Server error');
    expect(state.loading).toBe(false);
  });

  it('should add new wine', async () => {
    const mockResponse = { data: mockWine };
    (winesApi.addWine as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);

    await useWinesStore.getState().add(new FormData());

    const state = useWinesStore.getState();
    expect(state.wines).toContainEqual(mockWine);
  });

  it('should update existing wine', async () => {
    useWinesStore.setState({ wines: [mockWine] });
    const updatedWine = { ...mockWine, name: 'Updated Name' };
    (winesApi.updateWine as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: updatedWine,
    });

    await useWinesStore.getState().update('wine-1', new FormData());

    const state = useWinesStore.getState();
    expect(state.wines[0].name).toBe('Updated Name');
  });

  it('should remove wine', async () => {
    useWinesStore.setState({ wines: [mockWine] });
    (winesApi.deleteWine as ReturnType<typeof vi.fn>).mockResolvedValue({});

    await useWinesStore.getState().remove('wine-1');

    const state = useWinesStore.getState();
    expect(state.wines).toHaveLength(0);
  });
});
