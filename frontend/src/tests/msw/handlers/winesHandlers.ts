import { http, HttpResponse } from 'msw';
import { mockWines } from '@/tests/data/wines.mock';

const BASE_URL = 'http://localhost:5005/api';

const WINES_LIST = new RegExp(`^${BASE_URL}/wines`);
const WINES_ITEM = new RegExp(`^${BASE_URL}/wines/[^/]+$`);

export const winesHandlers = [
  http.get(WINES_LIST, ({ request }) => {
    const url = new URL(request.url);
    let wines = [...mockWines];


    const color = url.searchParams.get('color');
    if (color) {
      wines = wines.filter((w) => w.color === color);
    }

    const sweetness = url.searchParams.get('sweetness');
    if (sweetness) {
      wines = wines.filter((w) => w.sweetness === sweetness);
    }

    const grape = url.searchParams.get('grape');
    if (grape) {
      wines = wines.filter((w) => w.grape.name === grape);
    }

    const region = url.searchParams.get('region');
    if (region) {
      wines = wines.filter((w) => w.winery.region?._id === region);
    }

    const minRating = url.searchParams.get('minRating');
    if (minRating) {
      wines = wines.filter((w) => w.averageRating >= Number(minRating));
    }

    const vintage = url.searchParams.get('vintage');
    if (vintage) {
      wines = wines.filter((w) => w.vintage === Number(vintage));
    }

    const name = url.searchParams.get('name');
    if (name) {
      wines = wines.filter((w) => w.name.toLowerCase().includes(name.toLowerCase()));
    }

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

  http.post(`${BASE_URL}/wines`, async ({ request }) => {
    const formData = await request.formData();
    const newWine = {
      ...mockWines[0],
      _id: `mock-created-${Date.now()}`,
      name: formData.get('name') as string,
      price: Number(formData.get('price')),
    };
    return HttpResponse.json(newWine, { status: 201 });
  }),

  http.patch(WINES_ITEM, async ({ params }) => {
    const updatedWine = { ...mockWines[0], _id: params.id as string };
    return HttpResponse.json(updatedWine, { status: 200 });
  }),

  http.delete(WINES_ITEM, () => {
    return HttpResponse.json({ success: true });
  }),
];
