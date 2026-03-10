import apiClient from './axios';

export const getRegions = (country?: string) => {
  return apiClient.get('/locations/regions', { params: { country } });
};

export const getCountries = () => {
  return apiClient.get('/locations/countries');
};
