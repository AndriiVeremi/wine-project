export interface Region {
  _id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  country?: {
    _id: string;
    name: string;
  };
  locationAndClimate?: {
    title?: string;
    description?: string;
    features?: string[];
  };
  soils?: {
    title?: string;
    description?: string;
    mainTypes?: string[];
    properties?: string[];
  };
  cultureAndTraditions?: {
    title?: string;
    description?: string;
    rituals?: string[];
  };
  grape?: {
    title?: string;
    white?: Array<{ name: string; description: string }>;
    red?: Array<{ name: string; description: string }>;
  };
  typicalWines?: {
    title?: string;
    description?: string;
    styles?: string[];
  };
  pdo?: {
    title?: string;
    description?: string;
    list?: string[];
  };
  regionImportance?: {
    title?: string;
    description?: string;
    points?: string[];
  };
}
