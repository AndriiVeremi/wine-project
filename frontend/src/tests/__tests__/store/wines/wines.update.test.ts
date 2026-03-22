import { describe, it, expect, beforeEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '@/tests/msw/server';
import apiClient from '@/api/axios';
import { useWinesStore } from '@/store/wine/winesStore';
import { mockWine } from '@/tests/data/wines.mock';

const BASE_URL = apiClient.defaults.baseURL;

describe('winesStore.update (integration)', () => {
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

  it('updates a wine in the list', async () => {
    const store = useWinesStore.getState();

    const formData = new FormData();
    formData.append('name', 'Updated Wine');
    formData.append('price', '999');

    server.use(
      http.patch(`${BASE_URL}/wines/${mockWine._id}`, async ({ request }) => {
        const form = await request.formData();

        return HttpResponse.json(
          {
            ...mockWine,
            name: form.get('name'),
            price: Number(form.get('price')),
          },
          { status: 200 },
        );
      }),
    );

    await store.update(mockWine._id, formData);

    const state = useWinesStore.getState();

    expect(state.wines[0].name).toBe('Updated Wine');
    expect(state.wines[0].price).toBe(999);
    expect(state.error).toBe(null);
    expect(state.loading).toBe(false);
  });

  it('handles API error when updating wine', async () => {
    const store = useWinesStore.getState();

    server.use(
      http.patch(`${BASE_URL}/wines/${mockWine._id}`, () => {
        return HttpResponse.json({ message: 'Failed to update wine' }, { status: 500 });
      }),
    );

    const formData = new FormData();

    await store.update(mockWine._id, formData);

    const state = useWinesStore.getState();

    expect(state.error).toBe('Failed to update wine');
    expect(state.loading).toBe(false);
    expect(state.wines.length).toBe(1);
  });
});
