export type WineColor = 'red' | 'white' | 'rose' | 'orange';
export type WineSweetness = 'dry' | 'semi-dry' | 'semi-sweet' | 'sweet';

export interface BaseEntity {
  _id: string;
  name?: string;
  [key: string]: unknown;
}

export type Populated<T> = T | string;

export interface WineQueryParams {
  color?: WineColor;
  sweetness?: WineSweetness;
  grape?: string;
  wineryId?: string;
  country?: string;
  region?: string;
  minRating?: number;
  maxPrice?: number;
  vintage?: number;
  name?: string;
  inStock?: boolean;
  sortBy?: string;
  page?: number;
  limit?: number;
  [key: string]: unknown;
}

export interface WineryInfo {
  _id: string;
  name: string;
  owner?: string | { _id: string };
  isVip?: boolean;
  logoUrl?: string;
  country?: { _id: string; name: string };
  region?: { _id: string; name: string };
}

export interface GrapeInfo {
  _id: string;
  name: string;
  type?: WineColor;
  description?: string;
  characteristics?: string[];
  foodPairing?: string[];
  imageUrls?: string[];
  acidity?: string;
  body?: string;
  tannins?: string;
  aromas?: string[];
  agingPotential?: string;
}

export interface Wine {
  _id: string;
  winery: WineryInfo;
  name: string;
  vintage: number;
  grape: GrapeInfo;
  description: string;
  tastingNotes: string[];
  imageUrl: string;
  color: WineColor;
  sweetness: WineSweetness;
  averageRating: number;
  totalReviews?: number;
  price: number;
  volume?: number;
  boxQuantity?: number;
  hasPackaging?: boolean;
  alcohol?: string;
  decanting?: boolean;
  bottleDiameter?: string;
  servingTemperature?: string;
  foodPairing?: string[];
  supplier?: string;
  suffix?: string;
  isVip?: boolean;
  inStock?: boolean;
  buyLink?: string;
}

export interface Review {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;
  wineId?: Populated<{
    _id: string;
    name: string;
    imageUrl: string;
  }>;
  wineryId?: Populated<{
    _id: string;
    name: string;
    logoUrl?: string;
  }>;
  tourId?: Populated<{
    _id: string;
    name: string;
  }>;
  userId: Populated<{
    _id: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
  }>;
}

export interface UserReviewResponse {
  reviews: Review[];
  total: number;
  page: number;
  totalPages: number;
}
