export interface Winery {
  _id: string;
  name: string;
  owner: string;
  history?: string;
  country: string;
  region: string;
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  websiteUrl?: string;
  videoUrl?: string;
  isVip: boolean;
  logoUrl?: string;
  galleryUrl?: string[];
  imageUrls?: string[];
  whereToBuy?: { name: string; url: string }[];
  contactEmail: string;
  contactPhone: string;
  averageRating?: number;
  totalReviews?: number;
}

export interface WineriesQueryParams {
  page?: number;
  limit?: number;
  country?: string;
  region?: string;
  search?: string;
  [key: string]: unknown;
}
