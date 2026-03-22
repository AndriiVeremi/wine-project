import { describe, it, expect, beforeEach } from 'vitest';
import { useWinesStore } from '@/store/wine/winesStore';

describe('winesStore.fetch (integration)', () => {
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

  it('loads wines from API and updates state', async () => {
    const store = useWinesStore.getState();

    await store.fetch({ page: 1, limit: 10 });

    const state = useWinesStore.getState();

    expect(state.wines.length).toBe(10);
    expect(state.wines[0].name).toBe('Chardonnay Reserve');
  });
});
