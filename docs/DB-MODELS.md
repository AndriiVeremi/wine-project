# Data Models

This document describes the Mongoose/MongoDB data models for the application.

---

## User (Користувач)
Represents a user of the application.
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

## Winery (Виноробня)
Represents a winery.
```javascript
{
  name: { type: String, required: true, unique: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  history: String,
  country: String,
  region: String,
  address: String,
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
  grape: { type: String, required: true }, // Сорт винограду
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
