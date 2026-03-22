import { describe, it, expect, beforeEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '@/tests/msw/server';
import apiClient from '@/api/axios';
import { useWinesStore } from '@/store/wine/winesStore';
import { mockWine } from '@/tests/data/wines.mock';

const BASE_URL = apiClient.defaults.baseURL;

describe('winesStore.add (integration)', () => {
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

  it('adds a new wine to the beginning of the list', async () => {
    const store = useWinesStore.getState();

    const formData = new FormData();
    formData.append('name', 'New Wine');
    formData.append('price', '20');

    await store.add(formData);

    const state = useWinesStore.getState();

    expect(state.wines[0].name).toBe('New Wine');
    expect(state.wines[0].price).toBe(20);
    expect(state.wines.length).toBe(2);
    expect(state.error).toBe(null);
  });

  it('handles API error and sets error state', async () => {
    server.use(
      http.post(`${BASE_URL}/wines`, () => {
        return HttpResponse.json({ message: 'Failed to add wine' }, { status: 500 });
      }),
    );

    const store = useWinesStore.getState();

    const formData = new FormData();

    await store.add(formData);

    const state = useWinesStore.getState();

    expect(state.error).toBe('Failed to add wine');
    expect(state.loading).toBe(false);
    expect(state.wines.length).toBe(1);
  });
});
