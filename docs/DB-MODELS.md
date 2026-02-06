# Data Models

Цей документ описує моделі даних Mongoose/MongoDB для програми.

---

## User (Користувач)
Представляє користувача програми.
```javascript
{
  firebaseUid: { type: String, required: true, unique: true }, // Унікальний ID з Firebase
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { 
    type: String, 
    enum: ['USER', 'WINERY_OWNER', 'ADMIN'], 
    default: 'USER' 
  },
  winery: { type: Schema.Types.ObjectId, ref: 'Winery' }, // ID виноробні власника (якщо є)
  favoriteWines: [{ type: Schema.Types.ObjectId, ref: 'Wine' }] // Список ID улюблених вин
}
```

## Wineries (Виноробня)
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
  isVip: { type: Boolean, default: false }, // VIP-статус виноробні
  logoUrl: String,
  galleryUrl: [String],
  whereToBuy: [{ 
    name: String, 
    url: String 
  }] // Де купити
}
```

## Wine (Вино)
Represents a specific wine product.
```javascript
{
  winery: { type: Schema.Types.ObjectId, ref: 'Winery', required: true },
  name: { type: String, required: true },
  vintage: { type: Number, required: true }, // Рік врожаю
  grape: { type: Schema.Types.ObjectId, ref: 'Grape', required: true }, // Сорт винограду
  description: String,
  tastingNotes: [String], // "Теги" смаків для пошуку
  imageUrl: String,
  type: { 
    type: String, 
    enum: ['red', 'white', 'rose', 'sparkling', 'dessert'], 
    required: true 
  }, // Тип вина
  color: { 
    type: String, 
    enum: ['dry', 'semi-dry', 'sweet'], 
    required: true 
  }, // Сухість/солодкість
  averageRating: { type: Number, default: 0 }, // Середній рейтинг
  price: { type: Number, required: true } // Ціна
}
```

## Review (Відгук)
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

## Grape (Виноград)
Represents a grape variety.
```javascript
{
  name: { type: String, required: true, unique: true }, // Назва сорту
  description: String, // Опис сорту
  regions: [String] // Регіони, де вирощують цей сорт
}
```

## Tour (Винний тур)
Represents a wine tour offered by a winery.
```javascript
{
  winery: { type: Schema.Types.ObjectId, ref: 'Winery', required: true }, // ID виноробні
  name: { type: String, required: true }, // Назва туру
  description: String, // Опис
  duration: Number, // Тривалість у годинах
  price: Number, // Ціна
  images: [String], // Галерея туру
  groupSize: { 
    min: Number, 
    max: Number 
  } // Розмір групи
}
```

## Location (Локація)
Represents a geographical location, such as a country or a region.
```javascript
{
  name: { type: String, required: true, unique: true }, // Назва локації (країна, регіон)
  type: { type: String, enum: ['country', 'region'], required: true }, // Тип локації
  parentLocation: { type: Schema.Types.ObjectId, ref: 'Location', default: null } // Для регіонів, що належать країні
}
```
