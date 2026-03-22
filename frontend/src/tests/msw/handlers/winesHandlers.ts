import { http, HttpResponse } from 'msw';
import apiClient from '@/api/axios';
import { mockWines } from '@/tests/data/wines.mock';

const BASE_URL = apiClient.defaults.baseURL;

export const winesHandlers = [
  // GET /wines (filters + pagination)

  http.get(`${BASE_URL}/wines`, ({ request }) => {
    const url = new URL(request.url);
    let wines = [...mockWines];

    // --- FILTERS ---
    const color = url.searchParams.get('color');
    if (color) wines = wines.filter((w) => w.color === color);

    const sweetness = url.searchParams.get('sweetness');
    if (sweetness) wines = wines.filter((w) => w.sweetness === sweetness);

    const grape = url.searchParams.get('grape');
    if (grape) wines = wines.filter((w) => w.grape.name === grape);

    const region = url.searchParams.get('region');
    if (region) wines = wines.filter((w) => w.winery.region?._id === region);

    const minRating = url.searchParams.get('minRating');
    if (minRating) wines = wines.filter((w) => w.averageRating >= Number(minRating));

    const vintage = url.searchParams.get('vintage');
    if (vintage) wines = wines.filter((w) => w.vintage === Number(vintage));

    const name = url.searchParams.get('name');
    if (name) wines = wines.filter((w) => w.name.toLowerCase().includes(name.toLowerCase()));

    // --- PAGINATION ---
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 10;

    const start = (page - 1) * limit;
    const end = start + limit;

    const paginated = wines.slice(start, end);

    return HttpResponse.json({
      wines: paginated,
      totalCount: wines.length,
      page,
      limit,
      totalPages: Math.ceil(wines.length / limit),
    });
  }),

  // POST /wines (create)

  http.post(`${BASE_URL}/wines`, async ({ request }) => {
    const form = await request.formData();

    return HttpResponse.json(
      {
        _id: `mock-created-${Date.now()}`,
        name: form.get('name') || 'Mock Wine',
        price: Number(form.get('price')) || 1000,

        winery: {
          _id: 'w1',
          name: 'Test Winery',
        },

        vintage: 2020,

        grape: {
          _id: 'g1',
          name: 'Merlot',
        },

        description: 'Mock description',
        tastingNotes: [],
        imageUrl: '',

        color: 'red',
        sweetness: 'dry',

        averageRating: 4.5,
        totalReviews: 0,

        volume: 750,
        boxQuantity: 1,
        hasPackaging: true,
        alcohol: '13%',
        decanting: false,
        bottleDiameter: '7cm',
        servingTemperature: '16°C',
        foodPairing: [],
        supplier: 'Mock Supplier',
        suffix: '',
        isVip: false,
        inStock: true,
        buyLink: '',
      },
      { status: 201 },
    );
  }),

  // PATCH /wines/:id (update)

  http.patch(`${BASE_URL}/wines/:id`, async ({ params, request }) => {
    const form = await request.formData();

    return HttpResponse.json(
      {
        _id: params.id,
        name: form.get('name') || 'Updated Wine',
        price: Number(form.get('price')) || 1500,

        winery: {
          _id: 'w1',
          name: 'Test Winery',
          isVip: false,
          logoUrl: '',
          country: { _id: 'c1', name: 'Italy' },
          region: { _id: 'r1', name: 'Tuscany' },
        },

        vintage: 2020,

        grape: {
          _id: 'g1',
          name: 'Merlot',
        },

        description: 'Updated description',
        tastingNotes: [],
        imageUrl: '',

        color: 'red',
        sweetness: 'dry',

        averageRating: 4.5,
        totalReviews: 10,

        volume: 750,
        boxQuantity: 1,
        hasPackaging: true,
        alcohol: '13%',
        decanting: false,
        bottleDiameter: '7cm',
        servingTemperature: '16°C',
        foodPairing: [],
        supplier: 'Mock Supplier',
        suffix: '',
        isVip: false,
        inStock: true,
        buyLink: '',
      },
      { status: 200 },
    );
  }),

  // DELETE /wines/:id

  http.delete(`${BASE_URL}/wines/:id`, () => {
    return HttpResponse.json({ success: true });
  }),
];
