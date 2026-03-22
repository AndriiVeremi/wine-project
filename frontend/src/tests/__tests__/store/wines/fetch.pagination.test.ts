import { describe, it, expect, beforeEach } from 'vitest';
import { useWinesStore } from '@/store/wine/winesStore';

describe('winesStore.fetch (integration) — pagination', () => {
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

  it('returns correct wines for page 1', async () => {
    const store = useWinesStore.getState();

    await store.fetch({ page: 1, limit: 10 });

    const state = useWinesStore.getState();

    expect(state.wines.length).toBe(10);
    expect(state.page).toBe(1);
    expect(state.totalPages).toBe(2); // 12 wines total -> 2 pages
  });

  it('returns correct wines for page 2', async () => {
    const store = useWinesStore.getState();

    await store.fetch({ page: 2, limit: 10 });

    const state = useWinesStore.getState();

    expect(state.wines.length).toBe(2); // 12 total -> page2 has 2
    expect(state.page).toBe(2);
    expect(state.totalPages).toBe(2);
  });

  it('respects custom limit (limit = 5)', async () => {
    const store = useWinesStore.getState();

    await store.fetch({ page: 1, limit: 5 });

    const state = useWinesStore.getState();

    expect(state.wines.length).toBe(5);
    expect(state.page).toBe(1);
    expect(state.totalPages).toBe(3); // 12 wines -> 3 pages with limit=5
  });

  it('returns empty array when page exceeds totalPages', async () => {
    const store = useWinesStore.getState();

    await store.fetch({ page: 5, limit: 10 }); // only 2 pages exist

    const state = useWinesStore.getState();

    expect(state.wines.length).toBe(0);
    expect(state.page).toBe(5);
    expect(state.totalPages).toBe(2);
  });
});
