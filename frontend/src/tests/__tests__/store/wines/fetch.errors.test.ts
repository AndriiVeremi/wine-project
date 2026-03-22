import { describe, it, expect, beforeEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '@/tests/msw/server';
import api from '@/api/axios';
import { useWinesStore } from '@/store/wine/winesStore';

api.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5005/api';

describe('winesStore.fetch (integration) — error handling', () => {
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

  // --- 500 INTERNAL SERVER ERROR ---
  it('handles 500 Internal Server Error', async () => {
    server.use(
      http.get(`${api.defaults.baseURL}/wines`, () => {
        return HttpResponse.json({ message: 'Server crashed' }, { status: 500 });
      }),
    );

    const store = useWinesStore.getState();
    await store.fetch({ page: 1, limit: 10 });

    const state = useWinesStore.getState();

    expect(state.loading).toBe(false);
    expect(state.wines).toEqual([]);
    expect(state.error).toBe('Server crashed');
  });

  // --- 404 NOT FOUND ---
  it('handles 404 Not Found', async () => {
    server.use(
      http.get(`${api.defaults.baseURL}/wines`, () => {
        return HttpResponse.json({ message: 'Not found' }, { status: 404 });
      }),
    );

    const store = useWinesStore.getState();
    await store.fetch({ page: 1, limit: 10 });

    const state = useWinesStore.getState();

    expect(state.loading).toBe(false);
    expect(state.wines).toEqual([]);
    expect(state.error).toBe('Not found');
  });

  // --- NETWORK ERROR ---
  it('handles network error', async () => {
    server.use(
      http.get(`${api.defaults.baseURL}/wines`, () => {
        throw new Error('Network Error');
      }),
    );

    const store = useWinesStore.getState();
    await store.fetch({ page: 1, limit: 10 });

    const state = useWinesStore.getState();

    expect(state.loading).toBe(false);
    expect(state.wines).toEqual([]);
    expect(state.error).toBe('Network Error');
  });
});
