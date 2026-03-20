import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useGrapesStore } from '@/store/grape/grapesStore';
import * as grapesApi from '@/api/grapes';

vi.mock('@/api/grapes');

const mockGrape = {
  _id: 'grape-1',
  name: 'Saperavi',
  type: 'red' as const,
  description: 'Famous Georgian grape',
  regions: [{ _id: 'reg-1', name: 'Kakheti' }],
  imageUrls: ['http://test.com/grape.jpg'],
  alsoKnownAs: ['Saperavi Boreami'],
  characteristics: ['deep color', 'full body'],
  foodPairing: ['meat', 'cheese'],
  acidity: 'high',
  body: 'full',
  tannins: 'high',
  aromas: ['berry', 'plum'],
  agingPotential: '10 years',
};

describe('grapesStore', () => {
  beforeEach(() => {
    useGrapesStore.setState({
      grapes: [],
      loading: false,
      error: null,
      page: 1,
      totalPages: 1,
      totalCount: 0,
    });
    vi.clearAllMocks();
  });

  it('should have empty initial state', () => {
    const state = useGrapesStore.getState();
    expect(state.grapes).toEqual([]);
    expect(state.loading).toBe(false);
  });

  it('should fetch grapes', async () => {
    const mockResponse = {
      data: {
        grapes: [mockGrape],
        page: 1,
        totalPages: 1,
        totalCount: 1,
      },
    };
    (grapesApi.getGrapes as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);

    await useGrapesStore.getState().fetchGrapes({ page: 1, limit: 10 });

    const state = useGrapesStore.getState();
    expect(state.grapes).toHaveLength(1);
    expect(state.grapes[0].name).toBe('Saperavi');
  });

  it('should add new grape', async () => {
    (grapesApi.addGrape as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: mockGrape,
    });

    await useGrapesStore.getState().add({ name: 'Saperavi' });

    const state = useGrapesStore.getState();
    expect(state.grapes).toContainEqual(mockGrape);
  });

  it('should delete grape', async () => {
    useGrapesStore.setState({ grapes: [mockGrape] });
    (grapesApi.deleteGrape as ReturnType<typeof vi.fn>).mockResolvedValue({});

    await useGrapesStore.getState().removeGrape('grape-1');

    const state = useGrapesStore.getState();
    expect(state.grapes).toHaveLength(0);
  });

  it('should handle fetch error', async () => {
    (grapesApi.getGrapes as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Load failed'));

    await useGrapesStore.getState().fetchGrapes({ page: 1, limit: 10 });

    const state = useGrapesStore.getState();
    expect(state.error).toBe('Load failed');
  });
});
