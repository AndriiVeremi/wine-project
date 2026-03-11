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
  avatarUrl: { type: String, default: '' }, // URL аватара (base64 або зовнішній URL)
  phone: { type: String, default: '' }, // Номер телефону
  birthDate: { type: Date }, // Дата народження
  address: { type: String, default: '' }, // Адреса
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
  coordinates: {
    lat: Number, // Широта для мапи
    lng: Number  // Довгота для мапи
  },
  websiteUrl: String, // Офіційний веб-сайт
  videoUrl: String, // Посилання на YouTube відео
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

## Grape (Сорт винограду)
Представляє сорт винограду.
```javascript
{
  name: { type: String, required: true, unique: true }, // Назва сорту
  description: String, // Опис сорту
  type: { type: String, enum: ['red', 'white', 'rose'] }, // Тип винограду
  imageUrls: [String], // Масив URL зображень
  regions: [{ type: Schema.Types.ObjectId, ref: 'Location' }], // Регіони вирощування
  acidity: String, // Рівень кислотності
  body: String, // Щільність (тіло) вина
  tannins: String, // Рівень танінів (для червоних)
  aromas: [String], // Спектр ароматів
  agingPotential: String // Потенціал витримки
}
```

## Review (Відгук)
Представляє відгук користувача на вино.
```javascript
{
  wineId: { type: Schema.Types.ObjectId, ref: 'Wine', required: true }, // ID вина
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // ID користувача
  rating: { type: Number, required: true, min: 1, max: 5 }, // Рейтинг 1-5
  comment: String, // Текст
  createdAt: { type: Date, default: Date.now }
}
```

## Tour (Винний тур)
Представляє винний тур.
```javascript
{
  winery: { type: Schema.Types.ObjectId, ref: 'Winery', required: true },
  name: { type: String, required: true },
  description: String,
  duration: Number,
  price: Number,
  images: [String],
  groupSize: { min: Number, max: Number }
}
```

## Location (Локація)
```javascript
{
  name: { type: String, required: true, unique: true },
  type: { type: String, enum: ['country', 'region'], required: true },
  parentLocation: { type: Schema.Types.ObjectId, ref: 'Location', default: null }
}
```
