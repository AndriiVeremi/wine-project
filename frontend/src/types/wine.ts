export type WineColor = 'red' | 'white' | 'rose' | 'orange';

export type WineSweetness = 'dry' | 'semi-dry' | 'semi-sweet' | 'sweet';

export interface WineQueryParams {
  color?: WineColor;
  sweetness?: WineSweetness;
  grape?: string;
  country?: string;
  region?: string;
  page?: number;
  limit?: number;
}

export interface Wine {
  _id: string;
  winery: string;
  name: string;
  vintage: number;
  grape: string;
  description: string;
  tastingNotes: string[];
  imageUrl: string;
  color: WineColor;
  sweetness: WineSweetness;
  averageRating: number;
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
  isVip?: boolean;
}

export interface Review {
  _id: string;
  wineId: {
    _id: string;
    name: string;
    imageUrl: string;
  };
  userId: string;
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
