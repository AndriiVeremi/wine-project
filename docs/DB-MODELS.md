# Моделі даних

Цей документ описує моделі даних Mongoose/MongoDB для додатку.

---

## User (Користувач)
Представляє користувача додатку.
```javascript
{
  firebaseUid: { type: String, required: true, unique: true }, // Унікальний ID з Firebase
  firstName: { type: String, required: true }, // Ім'я користувача
  lastName: { type: String, required: true }, // Прізвище користувача
  email: { type: String, required: true, unique: true }, // Електронна пошта
  role: { 
    type: String, 
    enum: ['USER', 'WINERY_OWNER', 'ADMIN'], 
    default: 'USER' 
  }, // Роль користувача в системі
  winery: { type: Schema.Types.ObjectId, ref: 'Winery' }, // ID виноробні власника (якщо є)
  favoriteWines: [{ type: Schema.Types.ObjectId, ref: 'Wine' }] // Список ID улюблених вин
}
```

## Wineries (Виноробні)
Представляє виноробню.
```javascript
{
  name: { type: String, required: true, unique: true }, // Назва виноробні
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Власник виноробні
  history: String, // Історія виноробні
  country: { type: Schema.Types.ObjectId, ref: 'Location' }, // Країна (з моделі Location)
  region: { type: Schema.Types.ObjectId, ref: 'Location' }, // Регіон (з моделі Location)
  address: String, // Адреса
  contactEmail: String, // Контактна пошта
  contactPhone: String, // Контактний телефон
  isVip: { type: Boolean, default: false }, // VIP-статус виноробні
  logoUrl: String, // URL логотипу
  galleryUrl: [String], // Галерея зображень
  whereToBuy: [{ 
    name: String, 
    url: String 
  }] // Де придбати
}
```

## Wine (Вино)
Представляє конкретний винний продукт.
```javascript
{
  winery: { type: Schema.Types.ObjectId, ref: 'Winery', required: true }, // Виноробня, що виробляє вино
  name: { type: String, required: true }, // Назва вина
  vintage: { type: Number, required: true }, // Рік врожаю
  grape: { type: Schema.Types.ObjectId, ref: 'Grape', required: true }, // Сорт винограду
  description: String, // Опис вина
  tastingNotes: [String], // Смакові "теги" для пошуку
  imageUrl: String, // URL зображення вина
  color: { 
    type: String, 
    enum: ['red', 'white', 'rose', 'orange'], 
    required: true 
  }, // Колір вина
  sweetness: { 
    type: String, 
    enum: ['dry', 'semi-dry', 'semi-sweet', 'sweet'], 
    required: true 
  }, // Сухість/солодкість
  averageRating: { type: Number, default: 0 }, // Середній рейтинг
  price: { type: Number, required: true }, // Ціна
  volume: Number, // Об'єм у літрах
  boxQuantity: Number, // Кількість пляшок у ящику
  hasPackaging: Boolean, // Чи має вино упаковку
  alcohol: String, // Вміст алкоголю
  decanting: Boolean, // Чи потрібна декантація
  bottleDiameter: String, // Діаметр пляшки
  servingTemperature: String, // Рекомендована температура подачі
  foodPairing: [String], // Гастрономічне поєднання
  supplier: String // Постачальник
}
```

## Review (Відгук)
Представляє відгук користувача на вино.
```javascript
{
  wineId: { type: Schema.Types.ObjectId, ref: 'Wine', required: true }, // ID вина, до якого залишено відгук
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // ID користувача, що залишив відгук
  rating: { type: Number, required: true, min: 1, max: 5 }, // Рейтинг від 1 до 5
  comment: String, // Текст коментаря
  createdAt: { type: Date, default: Date.now } // Дата створення відгуку
}
```

## Grape (Сорт винограду)
Представляє сорт винограду.
```javascript
{
  name: { type: String, required: true, unique: true }, // Назва сорту
  description: String, // Опис сорту
  type: { type: String, enum: ['red', 'white', 'rose'] }, // Тип винограду
  alsoKnownAs: [String], // Інші назви сорту
  characteristics: [String], // Список смакових характеристик
  foodPairing: [String], // Список рекомендованих страв
  imageUrl: String, // URL зображення винограду
  regions: [{ type: Schema.Types.ObjectId, ref: 'Location' }] // Регіони, де вирощують цей виноград
}
```

## Tour (Винний тур)
Представляє винний тур, який пропонує виноробня.
```javascript
{
  winery: { type: Schema.Types.ObjectId, ref: 'Winery', required: true }, // ID виноробні
  name: { type: String, required: true }, // Назва туру
  description: String, // Опис
  duration: Number, // Тривалість у годинах
  price: Number, // Ціна
  images: [String], // Галерея туру
  groupSize: { 
    min: { type: Number, required: true, min: 1 }, 
    max: { type: Number, required: true, min: 1 } 
  } // Розмір групи
}
```

## Location (Локація)
Представляє географічне місце, таке як країна або регіон.
```javascript
{
  name: { type: String, required: true, unique: true }, // Назва локації (країна, регіон)
  type: { type: String, enum: ['country', 'region'], required: true }, // Тип локації
  parentLocation: { type: Schema.Types.ObjectId, ref: 'Location', default: null } // Для регіонів, що належать до країни
}
```

## Region (Регіон)
Представляє детальну сторінку винного регіону.
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
