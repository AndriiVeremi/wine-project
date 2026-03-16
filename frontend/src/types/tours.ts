export interface Tour {
  _id: string;
  winery: string | { _id: string; name: string; region?: { name: string } };
  name: string;
  description?: string;
  duration?: number;
  price?: number;
  images: string[];
  groupSize: {
    min: number;
    max: number;
  };
  averageRating: number;
  totalReviews: number;
}

export interface ToursResponse {
  tours: Tour[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TourQueryParams {
  page?: number;
  limit?: number;
  wineryId?: string;
  region?: string;
  name?: string;
}
