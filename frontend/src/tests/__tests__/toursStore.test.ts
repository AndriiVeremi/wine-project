import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useToursStore } from '@/store/tours/toursStore';
import * as toursApi from '@/api/tours';

vi.mock('@/api/tours');

const mockTour = {
  _id: 'tour-1',
  name: 'Wine Tasting Tour',
  description: 'Amazing tour',
  price: 100,
  duration: 180,
  imageUrl: 'http://test.com/tour.jpg',
  images: [],
  groupSize: { min: 2, max: 10 },
  averageRating: 4.5,
  totalReviews: 5,
  winery: { _id: 'win-1', name: 'Test Winery' },
};

describe('toursStore', () => {
  beforeEach(() => {
    useToursStore.setState({
      tours: [],
      loading: false,
      error: null,
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 1,
    });
    vi.clearAllMocks();
  });

  it('should start with empty tours', () => {
    const state = useToursStore.getState();
    expect(state.tours).toEqual([]);
    expect(state.loading).toBe(false);
  });

  it('should fetch tours', async () => {
    const mockResponse = {
      data: {
        tours: [mockTour],
        page: 1,
        limit: 10,
        totalCount: 1,
        totalPages: 1,
      },
    };
    (toursApi.getTours as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);

    await useToursStore.getState().fetch({});

    const state = useToursStore.getState();
    expect(state.tours).toHaveLength(1);
    expect(state.tours[0].name).toBe('Wine Tasting Tour');
  });

  it('should add tour', async () => {
    (toursApi.addTour as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: mockTour,
    });

    await useToursStore.getState().add(new FormData());

    const state = useToursStore.getState();
    expect(state.tours).toContainEqual(mockTour);
  });

  it('should delete tour', async () => {
    useToursStore.setState({ tours: [mockTour] });
    (toursApi.deleteTour as ReturnType<typeof vi.fn>).mockResolvedValue({});

    await useToursStore.getState().remove('tour-1');

    const state = useToursStore.getState();
    expect(state.tours).toHaveLength(0);
  });

  it('should set error on API fail', async () => {
    (toursApi.getTours as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Network error'));

    await useToursStore.getState().fetch({});

    const state = useToursStore.getState();
    expect(state.error).toBe('Network error');
  });
});
