import { describe, it, expect, beforeEach } from 'vitest';
import { useWinesStore } from '@/store/wine/winesStore';

describe('winesStore.fetch (integration) — filters', () => {
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
  });

  it('filters wines by color', async () => {
    const store = useWinesStore.getState();
    await store.fetch({ color: 'red' });

    const state = useWinesStore.getState();
    expect(state.wines.length).toBeGreaterThan(0);
    expect(state.wines.every((w) => w.color === 'red')).toBe(true);
  });

  it('filters wines by sweetness', async () => {
    const store = useWinesStore.getState();
    await store.fetch({ sweetness: 'dry' });

    const state = useWinesStore.getState();
    expect(state.wines.length).toBeGreaterThan(0);
    expect(state.wines.every((w) => w.sweetness === 'dry')).toBe(true);
  });

  it('filters wines by grape', async () => {
    const store = useWinesStore.getState();
    await store.fetch({ grape: 'Cabernet Sauvignon' });

    const state = useWinesStore.getState();
    expect(state.wines.length).toBeGreaterThan(0);
    expect(state.wines.every((w) => w.grape.name === 'Cabernet Sauvignon')).toBe(true);
  });

  it('filters wines by region', async () => {
    const store = useWinesStore.getState();
    await store.fetch({ region: 'region-2' });

    const state = useWinesStore.getState();
    expect(state.wines.length).toBeGreaterThan(0);
    expect(state.wines.every((w) => w.winery.region?._id === 'region-2')).toBe(true);
  });

  it('filters wines by minRating', async () => {
    const store = useWinesStore.getState();
    await store.fetch({ minRating: 4 });

    const state = useWinesStore.getState();
    expect(state.wines.length).toBeGreaterThan(0);
    expect(state.wines.every((w) => w.averageRating >= 4)).toBe(true);
  });

  it('filters wines by vintage', async () => {
    const store = useWinesStore.getState();
    await store.fetch({ vintage: 2020 });

    const state = useWinesStore.getState();
    expect(state.wines.length).toBeGreaterThan(0);
    expect(state.wines.every((w) => w.vintage === 2020)).toBe(true);
  });

  it('filters wines by name (case-insensitive)', async () => {
    const store = useWinesStore.getState();
    await store.fetch({ name: 'Sauvignon' });

    const state = useWinesStore.getState();
    expect(state.wines.length).toBeGreaterThan(0);
    expect(state.wines.every((w) => w.name.toLowerCase().includes('sauvignon'))).toBe(true);
  });

  it('filters wines by multiple filters together', async () => {
    const store = useWinesStore.getState();

    await store.fetch({
      color: 'red',
      sweetness: 'dry',
      region: 'region-7',
      minRating: 4,
      name: 'Syrah',
    });

    const state = useWinesStore.getState();

    expect(state.wines.length).toBeGreaterThan(0);
    expect(state.wines.every((w) => w.color === 'red')).toBe(true);
    expect(state.wines.every((w) => w.sweetness === 'dry')).toBe(true);
    expect(state.wines.every((w) => w.winery.region?._id === 'region-7')).toBe(true);
    expect(state.wines.every((w) => w.averageRating >= 4)).toBe(true);
    expect(state.wines.every((w) => w.name.toLowerCase().includes('syrah'))).toBe(true);
  });
});
