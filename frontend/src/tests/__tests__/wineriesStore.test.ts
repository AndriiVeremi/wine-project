import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useWineriesStore } from '@/store/wineries/wineriesStore';
import * as wineriesApi from '@/api/wineries';

vi.mock('@/api/wineries');

const mockWinery = {
  _id: 'win-1',
  name: 'Test Winery',
  owner: 'user-1',
  country: 'georgia-id',
  region: 'kakheti-id',
  address: 'Tbilisi',
  contactEmail: 'test@winery.com',
  contactPhone: '+99551234567',
  isVip: true,
  averageRating: 4.8,
  logoUrl: 'http://test.com/logo.png',
  galleryUrl: [],
};

describe('wineriesStore', () => {
  beforeEach(() => {
    useWineriesStore.setState({
      wineries: [],
      loading: false,
      error: null,
      page: 1,
      total: 0,
      totalPages: 1,
    });
    vi.clearAllMocks();
  });

  it('should have correct initial state', () => {
    const state = useWineriesStore.getState();
    expect(state.wineries).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  it('should fetch wineries', async () => {
    const mockResponse = {
      data: {
        wineries: [mockWinery],
        page: 1,
        totalCount: 1,
        totalPages: 1,
      },
    };
    (wineriesApi.getWineries as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);

    await useWineriesStore.getState().fetchWineries({});

    const state = useWineriesStore.getState();
    expect(state.wineries).toEqual([mockWinery]);
    expect(state.loading).toBe(false);
  });

  it('should handle fetch error', async () => {
    (wineriesApi.getWineries as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error('Failed to load'),
    );

    await useWineriesStore.getState().fetchWineries({});

    const state = useWineriesStore.getState();
    expect(state.error).toBe('Failed to load');
  });

  it('should add winery', async () => {
    (wineriesApi.addWinery as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: mockWinery,
    });

    await useWineriesStore.getState().add(new FormData());

    const state = useWineriesStore.getState();
    expect(state.wineries).toHaveLength(1);
    expect(state.wineries[0].name).toBe('Test Winery');
  });

  it('should update winery', async () => {
    useWineriesStore.setState({ wineries: [mockWinery] });
    const updated = { ...mockWinery, name: 'New Name' };
    (wineriesApi.updateWinery as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: updated,
    });

    await useWineriesStore.getState().update('win-1', new FormData());

    const state = useWineriesStore.getState();
    expect(state.wineries[0].name).toBe('New Name');
  });
});
