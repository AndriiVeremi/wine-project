export interface IRegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'USER' | 'WINERY_OWNER';
}

export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'USER' | 'WINERY_OWNER' | 'ADMIN';
  avatarUrl?: string;
  favoriteWines?: string[];
  phone?: string;
  birthDate?: string;
  address?: string;
  winery?: {
    _id: string;
    name: string;
  };
}
