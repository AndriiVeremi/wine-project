import { http, HttpResponse } from 'msw';
import apiClient from '@/api/axios';
import { mockWines } from '@/tests/data/wines.mock';

const BASE_URL = apiClient.defaults.baseURL;

// Utility RegExps
const WINES_LIST = new RegExp(`${BASE_URL}/wines.*$`);
const WINES_ITEM = new RegExp(`${BASE_URL}/wines/[^/]+$`);

export const winesHandlers = [
  // GET /wines (filters + pagination)
  http.get(WINES_LIST, ({ request }) => {
    console.log(`[MSW][WINES][GET] URL: ${request.url}`);

    const url = new URL(request.url);
    let wines = [...mockWines];

    // --- FILTERS ---
    const color = url.searchParams.get('color');
    if (color) {
      console.log(`[MSW][WINES][FILTER] color=${color}`);
      wines = wines.filter((w) => w.color === color);
    }

    const sweetness = url.searchParams.get('sweetness');
    if (sweetness) {
      console.log(`[MSW][WINES][FILTER] sweetness=${sweetness}`);
      wines = wines.filter((w) => w.sweetness === sweetness);
    }

    const grape = url.searchParams.get('grape');
    if (grape) {
      console.log(`[MSW][WINES][FILTER] grape=${grape}`);
      wines = wines.filter((w) => w.grape.name === grape);
    }

    const region = url.searchParams.get('region');
    if (region) {
      console.log(`[MSW][WINES][FILTER] region=${region}`);
      wines = wines.filter((w) => w.winery.region?._id === region);
    }

    const minRating = url.searchParams.get('minRating');
    if (minRating) {
      console.log(`[MSW][WINES][FILTER] minRating>=${minRating}`);
      wines = wines.filter((w) => w.averageRating >= Number(minRating));
    }

    const vintage = url.searchParams.get('vintage');
    if (vintage) {
      console.log(`[MSW][WINES][FILTER] vintage=${vintage}`);
      wines = wines.filter((w) => w.vintage === Number(vintage));
    }

    const name = url.searchParams.get('name');
    if (name) {
      console.log(`[MSW][WINES][FILTER] name~${name}`);
      wines = wines.filter((w) => w.name.toLowerCase().includes(name.toLowerCase()));
    }

    // --- PAGINATION ---
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 10;

    console.log(`[MSW][WINES][PAGINATION] page=${page}, limit=${limit}`);

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
    console.log(`[MSW][WINES][POST] Creating wine`);

    const form = await request.formData();

    return HttpResponse.json(
      {
        _id: `mock-created-${Date.now()}`,
        name: form.get('name') || 'Mock Wine',
        price: Number(form.get('price')) || 1000,
        winery: { _id: 'w1', name: 'Test Winery' },
        vintage: 2020,
        grape: { _id: 'g1', name: 'Merlot' },
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
  http.patch(WINES_ITEM, async ({ request, params }) => {
    console.log(`[MSW][WINES][PATCH] Updating wine: ${params.id}`);

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
        grape: { _id: 'g1', name: 'Merlot' },
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
  http.delete(WINES_ITEM, ({ params }) => {
    console.log(`[MSW][WINES][DELETE] Removing wine: ${params.id}`);
    return HttpResponse.json({ success: true });
  }),
];
