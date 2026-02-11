# Data Models

This document describes the Mongoose/MongoDB data models for the application.

---

## User
Represents an application user.
```javascript
{
  firebaseUid: { type: String, required: true, unique: true }, // Unique ID from Firebase
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { 
    type: String, 
    enum: ['USER', 'WINERY_OWNER', 'ADMIN'], 
    default: 'USER' 
  },
  winery: { type: Schema.Types.ObjectId, ref: 'Winery' }, // ID of the owner's winery (if any)
  favoriteWines: [{ type: Schema.Types.ObjectId, ref: 'Wine' }] // List of favorite wine IDs
}
```

## Wineries
Represents a winery.
```javascript
{
  name: { type: String, required: true, unique: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  history: String,
  country: { type: Schema.Types.ObjectId, ref: 'Location' },
  region: { type: Schema.Types.ObjectId, ref: 'Location' },
  address: String,
  contactEmail: String,
  contactPhone: String,
  isVip: { type: Boolean, default: false }, // VIP status of the winery
  logoUrl: String,
  galleryUrl: [String],
  whereToBuy: [{ 
    name: String, 
    url: String 
  }] // Where to buy
}
```

## Wine
Represents a specific wine product.
```javascript
{
  winery: { type: Schema.Types.ObjectId, ref: 'Winery', required: true },
  name: { type: String, required: true },
  vintage: { type: Number, required: true }, // Vintage year
  grape: { type: Schema.Types.ObjectId, ref: 'Grape', required: true }, // Grape variety
  description: String,
  tastingNotes: [String], // Taste "tags" for searching
  imageUrl: String,
  type: { 
    type: String, 
    enum: ['red', 'white', 'rose', 'orange'], 
    required: true 
  }, // Type of wine
  sweetness: { 
    type: String, 
    enum: ['dry', 'semi-dry', 'sweet'], 
    required: true 
  }, // Dryness/sweetness
  averageRating: { type: Number, default: 0 }, // Average rating
  price: { type: Number, required: true }, // Price
  volume: Number, // Volume in liters
  boxQuantity: Number, // Number of bottles in a box
  hasPackaging: Boolean, // Whether the wine has packaging
  alcohol: String, // Alcohol content
  decanting: Boolean, // Whether decanting is required
  bottleDiameter: String, // Bottle diameter
  servingTemperature: String, // Recommended serving temperature
  foodPairing: [String], // Gastronomic combination
  supplier: String // Supplier
}
```

## Review
Represents a user review for a wine.
```javascript
{
  wineId: { type: Schema.Types.ObjectId, ref: 'Wine', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: String,
  createdAt: { type: Date, default: Date.now }
}
```

## Grape
Represents a grape variety.
```javascript
{
  name: { type: String, required: true, unique: true }, // Name of the variety
  description: String, // Description of the variety
  type: { type: String, enum: ['red', 'white', 'rose'] }, // Type of grape
  alsoKnownAs: [String], // Other names for the variety
  characteristics: [String], // List of taste characteristics
  foodPairing: [String], // List of recommended dishes
  imageUrl: String, // URL of the grape image
  regions: [{ type: Schema.Types.ObjectId, ref: 'Location' }] // Regions where this grape is grown
}
```

## Tour
Represents a wine tour offered by a winery.
```javascript
{
  winery: { type: Schema.Types.ObjectId, ref: 'Winery', required: true }, // Winery ID
  name: { type: String, required: true }, // Tour name
  description: String, // Description
  duration: Number, // Duration in hours
  price: Number, // Price
  images: [String], // Tour gallery
  groupSize: { 
    min: Number, 
    max: Number 
  } // Group size
}
```

## Location
Represents a geographical location, such as a country or a region.
```javascript
{
  name: { type: String, required: true, unique: true }, // Location name (country, region)
  type: { type: String, enum: ['country', 'region'], required: true }, // Location type
  parentLocation: { type: Schema.Types.ObjectId, ref: 'Location', default: null } // For regions belonging to a country
}
```

## Region
Represents a detailed wine region page.
```javascript
{
  name: { type: String, required: true, unique: true },
  description: { type: String },
  imageUrl: { type: String },
  country: { type: Schema.Types.ObjectId, ref: 'Location' },
  climate: {
    title: { type: String },
    description: { type: String },
    features: [{ type: String }],
  },
  soils: {
    title: { type: String },
    description: { type: String },
    mainTypes: [{ type: String }],
    properties: [{ type: String }],
  },
  traditions: {
    title: { type: String },
    description: { type: String },
    rituals: [{ type: String }],
  },
  grapeVarieties: {
    title: { type: String },
    white: [
      {
        name: { type: String },
        description: { type: String },
      },
    ],
    red: [
      {
        name: { type: String },
        description: { type: String },
      },
    ],
  },
  typicalWines: {
    title: { type: String },
    description: { type: String },
    styles: [{ type: String }],
  },
  pdos: {
    title: { type: String },
    description: { type: String },
    list: [{ type: String }],
  },
  importance: {
    title: { type: String },
    description: { type: String },
    points: [{ type: String }],
  },
}
```
