import { http, HttpResponse } from 'msw';

const BASE_URL = 'http://localhost:5005/api';

export const locationHandlers = [
  http.get(`${BASE_URL}/locations/countries`, () => {
    return HttpResponse.json([{ _id: 'geo-1', name: 'Georgia' }]);
  }),
  http.get(`${BASE_URL}/locations/regions`, () => {
    return HttpResponse.json([{ _id: 'kakheti', name: 'Kakheti' }]);
  }),
];
