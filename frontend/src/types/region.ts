export interface Region {
  _id: string;
  name: string;
  description: string;
  imageUrl?: string;
  country?: {
    _id: string;
    name: string;
  };
  climate?: {
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
  traditions?: {
    title?: string;
    description?: string;
    rituals?: string[];
  };
  grapeVarieties?: {
    title?: string;
    white?: Array<{ name: string; description: string }>;
    red?: Array<{ name: string; description: string }>;
  };
  typicalWines?: {
    title?: string;
    description?: string;
    styles?: string[];
  };
  pdos?: {
    title?: string;
    description?: string;
    list?: string[];
  };
  importance?: {
    title?: string;
    description?: string;
    points?: string[];
  };
}
