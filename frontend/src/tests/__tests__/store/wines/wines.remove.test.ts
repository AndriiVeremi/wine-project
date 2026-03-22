import { describe, it, expect, beforeEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '@/tests/msw/server';
import apiClient from '@/api/axios';
import { useWinesStore } from '@/store/wine/winesStore';
import { mockWine } from '@/tests/data/wines.mock';

const BASE_URL = apiClient.defaults.baseURL;

describe('winesStore.remove (integration)', () => {
  beforeEach(() => {
    useWinesStore.setState({
      wines: [mockWine],
      loading: false,
      error: null,
      page: 1,
      limit: 10,
      total: 1,
      totalPages: 1,
    });
  });

  it('removes a wine from the list', async () => {
    const store = useWinesStore.getState();

    await store.remove(mockWine._id);

    const state = useWinesStore.getState();

    expect(state.wines.length).toBe(0);
    expect(state.error).toBe(null);
    expect(state.loading).toBe(false);
  });

  it('handles API error when deleting wine', async () => {
    const store = useWinesStore.getState();

    server.use(
      http.delete(`${BASE_URL}/wines/${mockWine._id}`, () => {
        return HttpResponse.json({ message: 'Failed to delete wine' }, { status: 500 });
      }),
    );

    await store.remove(mockWine._id);

    const state = useWinesStore.getState();

    expect(state.error).toBe('Failed to delete wine');
    expect(state.loading).toBe(false);
    expect(state.wines.length).toBe(1);
  });
});
