import apiClient from './axios';

export const getRegions = (country?: string) => {
  return apiClient.get('/locations/regions', { params: { country } });
};

export const getAllRegions = () => {
  return apiClient.get('/regions');
};

export const getRegionByName = (name: string) => {
  return apiClient.get(`/regions/${name}`);
};

export const getCountries = () => {
  return apiClient.get('/locations/countries');
};
