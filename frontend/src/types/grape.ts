import type { Winery } from './wineries';

export interface Region {
  _id: string;
  name: string;
}

export interface Grape {
  _id: string;
  name: string;
  description: string;
  type: 'red' | 'white' | 'rose';
  alsoKnownAs: string[];
  characteristics: string[];
  foodPairing: string[];
  imageUrls: string[];
  regions: Region[];
  acidity: string;
  body: string;
  tannins?: string;
  aromas: string[];
  agingPotential: string;
  winery?: string | Winery;
}

export interface GrapesQueryParams {
  search?: string;
  type?: string;
  region?: string;
  body?: string;
  acidity?: string;
  page?: number;
  limit?: number;
  wineryId?: string;
  [key: string]: unknown;
}
