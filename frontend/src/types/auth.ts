export interface IRegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'USER' | 'WINERY_OWNER';
}
