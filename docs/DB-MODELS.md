# Моделі даних

Цей документ описує моделі даних Mongoose/MongoDB для додатку.

---

## User (Користувач)
Представляє користувача додатку.
```javascript
{
  firebaseUid: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { 
    type: String, 
    enum: ['USER', 'WINERY_OWNER', 'ADMIN'], 
    default: 'USER' 
  },
  avatarUrl: { type: String, default: '' },
  phone: { type: String, default: '' },
  birthDate: { type: Date },
  address: { type: String, default: '' },
  winery: { type: Schema.Types.ObjectId, ref: 'Winery' },
  favoriteWines: [{ type: Schema.Types.ObjectId, ref: 'Wine' }],
  isBanned: { type: Boolean, default: false } // Чи заблокований користувач
}
```

## Wineries (Виноробні)
Представляє виноробню.
```javascript
{
  name: { type: String, required: true, unique: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  history: String,
  country: { type: Schema.Types.ObjectId, ref: 'Location' },
  region: { type: Schema.Types.ObjectId, ref: 'Location' },
  address: String,
  coordinates: { lat: Number, lng: Number },
  websiteUrl: String,
  videoUrl: String,
  contactEmail: String,
  contactPhone: String,
  isVip: { type: Boolean, default: false },
  logoUrl: String,
  galleryUrl: [String],
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 }
}
```

## Wine (Вино)
```javascript
{
  winery: { type: Schema.Types.ObjectId, ref: 'Winery', required: true },
  name: { type: String, required: true },
  vintage: { type: Number, required: true },
  grape: { type: Schema.Types.ObjectId, ref: 'Grape', required: true },
  description: String,
  tastingNotes: [String],
  imageUrl: String,
  color: { type: String, enum: ['red', 'white', 'rose', 'orange'], required: true },
  sweetness: { type: String, enum: ['dry', 'semi-dry', 'semi-sweet', 'sweet'], required: true },
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  price: { type: Number, required: true }
}
```

## Review (Відгук)
Універсальна модель для відгуків.
```javascript
{
  wineId: { type: Schema.Types.ObjectId, ref: 'Wine' }, // Якщо відгук про вино
  wineryId: { type: Schema.Types.ObjectId, ref: 'Winery' }, // Якщо відгук про виноробню
  tourId: { type: Schema.Types.ObjectId, ref: 'Tour' }, // Якщо відгук про тур
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: String,
  createdAt: { type: Date, default: Date.now }
}
```

## Tour (Винний тур)
```javascript
{
  winery: { type: Schema.Types.ObjectId, ref: 'Winery', required: true },
  name: { type: String, required: true },
  description: String,
  duration: Number,
  price: Number,
  images: [String],
  groupSize: { min: Number, max: Number },
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 }
}
```
