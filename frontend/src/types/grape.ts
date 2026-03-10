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
}
