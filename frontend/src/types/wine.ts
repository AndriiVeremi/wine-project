export type WineColor = 'red' | 'white' | 'rose' | 'orange';

export type WineSweetness = 'dry' | 'semi-dry' | 'semi-sweet' | 'sweet';

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
}

export interface WineryInfo {
  _id: string;
  name: string;
  isVip?: boolean;
  logoUrl?: string;
  country?: {
    _id: string;
    name: string;
  };
  region?: {
    _id: string;
    name: string;
  };
}

export interface GrapeInfo {
  _id: string;
  name: string;
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

export interface WishlistWine {
  id: string;
  name: string;
  winery: { id: string; name: string } | null;
  imageUrl: string;
  color: string;
  sweetness: string;
}

export interface Review {
  _id: string;
  wineId:
    | {
        _id: string;
        name: string;
        imageUrl: string;
      }
    | string;
  userId:
    | {
        _id: string;
        firstName: string;
        lastName: string;
        avatarUrl?: string;
      }
    | string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface UserReviewResponse {
  reviews: Review[];
  total: number;
  page: number;
  totalPages: number;
}
