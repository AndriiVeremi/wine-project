import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useWineQueryParams } from '@/hooks/useWineQueryParams';
import { useFiltersStore } from '@/store/wine/filtersStore';

describe('useWineQueryParams', () => {
  beforeEach(() => {
    useFiltersStore.setState({
      page: 1,
      country: '',
      region: '',
      sweetness: '',
      color: '',
      grape: '',
      wineryId: '',
      minRating: '',
      vintage: '',
      nameInput: '',
      name: '',
    });
    vi.clearAllMocks();
  });

  it('should return default page 1 when no filters set', () => {
    const { result } = renderHook(() => useWineQueryParams());
    expect(result.current.page).toBe(1);
  });

  it('should return undefined for optional filters when not set', () => {
    const { result } = renderHook(() => useWineQueryParams());
    expect(result.current.region).toBeUndefined();
    expect(result.current.sweetness).toBeUndefined();
    expect(result.current.color).toBeUndefined();
    expect(result.current.grape).toBeUndefined();
  });

  it('should convert region to lowercase', () => {
    act(() => {
      useFiltersStore.setState({ region: 'KAKHETI' });
    });
    const { result } = renderHook(() => useWineQueryParams());
    expect(result.current.region).toBe('kakheti');
  });

  it('should convert sweetness to lowercase', () => {
    act(() => {
      useFiltersStore.setState({ sweetness: 'dry' });
    });
    const { result } = renderHook(() => useWineQueryParams());
    expect(result.current.sweetness).toBe('dry');
  });

  it('should convert color to lowercase', () => {
    act(() => {
      useFiltersStore.setState({ color: 'red' });
    });
    const { result } = renderHook(() => useWineQueryParams());
    expect(result.current.color).toBe('red');
  });

  it('should convert minRating to number', () => {
    act(() => {
      useFiltersStore.setState({ minRating: '4' });
    });
    const { result } = renderHook(() => useWineQueryParams());
    expect(result.current.minRating).toBe(4);
  });

  it('should convert vintage to number', () => {
    act(() => {
      useFiltersStore.setState({ vintage: '2020' });
    });
    const { result } = renderHook(() => useWineQueryParams());
    expect(result.current.vintage).toBe(2020);
  });

  it('should return name when set', () => {
    act(() => {
      useFiltersStore.setState({ name: 'Cabernet' });
    });
    const { result } = renderHook(() => useWineQueryParams());
    expect(result.current.name).toBe('Cabernet');
  });

  it('should return wineryId when set', () => {
    act(() => {
      useFiltersStore.setState({ wineryId: 'winery-123' });
    });
    const { result } = renderHook(() => useWineQueryParams());
    expect(result.current.wineryId).toBe('winery-123');
  });

  it('should handle partial filters', () => {
    act(() => {
      useFiltersStore.setState({
        region: 'Imereti',
        color: 'white',
        name: 'Test',
      });
    });
    const { result } = renderHook(() => useWineQueryParams());

    expect(result.current.region).toBe('imereti');
    expect(result.current.color).toBe('white');
    expect(result.current.name).toBe('Test');
    expect(result.current.sweetness).toBeUndefined();
  });
});
