# Моделі даних

Цей документ описує моделі даних Mongoose/MongoDB для проєкту Wine Project.

---

## User (Користувач)
Представляє користувача додатку.

```typescript
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
  isBanned: { type: Boolean, default: false }
}
```

### Ролі користувачів
| Роль | Опис |
|------|------|
| `USER` | Звичайний користувач |
| `WINERY_OWNER` | Власник виноробні (має доступ до управління своєю виноробнею) |
| `ADMIN` | Адміністратор системи |

---

## Winery (Виноробня)
Представляє виноробню.

```typescript
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

### VIP-статус
Виноробні з `isVip: true` отримують пріоритетне відображення у пошуку.

---

## Wine (Вино)

```typescript
{
  winery: { type: Schema.Types.ObjectId, ref: 'Winery', required: true },
  name: { type: String, required: true },
  vintage: { type: Number, required: true },
  grape: { type: Schema.Types.ObjectId, ref: 'Grape', required: true },
  description: String,
  tastingNotes: [String],
  imageUrl: String,
  color: { 
    type: String, 
    enum: ['red', 'white', 'rose', 'orange'], 
    required: true 
  },
  sweetness: { 
    type: String, 
    enum: ['dry', 'semi-dry', 'semi-sweet', 'sweet'], 
    required: true 
  },
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  price: { type: Number, required: true }
}
```

### Типи вина за кольором
| Тип | Опис |
|-----|------|
| `red` | Червоне |
| `white` | Біле |
| `rose` | Рожеве |
| `orange` | Помаранчеве |

### Типи вина за солодкістю
| Тип | Опис |
|-----|------|
| `dry` | Сухе |
| `semi-dry` | Напівсухе |
| `semi-sweet` | Напівсолодке |
| `sweet` | Солодке |

---

## Grape (Сорт винограду)

```typescript
{
  winery: { type: Schema.Types.ObjectId, ref: 'Winery' },
  name: { type: String, required: true },
  description: String,
  type: { type: String, enum: ['red', 'white', 'rose'] },
  alsoKnownAs: [String],
  characteristics: [String],
  foodPairing: [String],
  imageUrls: [String],
  regions: [{ type: Schema.Types.ObjectId, ref: 'Location' }],
  acidity: String,
  body: String,
  tannins?: String,
  aromas: [String],
  agingPotential: String
}
```

### Типи винограду
| Тип | Опис |
|-----|------|
| `red` | Червоний |
| `white` | Білий |
| `rose` | Рожевий |

---

## Location (Локація)
Ієрархічна модель для країн та регіонів.

```typescript
{
  name: { type: String, required: true, unique: true },
  type: { 
    type: String, 
    enum: ['country', 'region'], 
    required: true 
  },
  parentLocation: { type: Schema.Types.ObjectId, ref: 'Location' }
}
```

### Структура
- `country` — країна (кореневий елемент)
- `region` — регіон (має `parentLocation` — посилання на країну)

---

## Review (Відгук)
Універсальна модель для відгуків про різні сутності.

```typescript
{
  wineId: { type: Schema.Types.ObjectId, ref: 'Wine' },
  wineryId: { type: Schema.Types.ObjectId, ref: 'Winery' },
  tourId: { type: Schema.Types.ObjectId, ref: 'Tour' },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: String,
  createdAt: { type: Date, default: Date.now }
}
```

### Особливості
- Відгук може бути прив'язаний лише до одного типу сутності (`wineId`, `wineryId` або `tourId`)
- Рейтинг від 1 до 5 балів

---

## Tour (Винний тур)
Представляє тури/екскурсії на виноробні.

```typescript
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

---

## Зв'язки між моделями

```
User (1) ──────< Winery (1)
  │                 │
  │                 ├────< Wine (N)
  │                 ├────< Tour (N)
  │                 └────< Review (N)
  │
  └───────────────< Review (N)
  │
  └──────────────< Wine.favoriteWines (N:N)

Winery ─────────> Location (N:1) [country]
                      │
                      └────────> Location (N:1) [region]

Wine ───────────> Grape (N:1)
Grape ──────────> Location (N:N) [regions]

Review ─────────> Wine (N:1)
Review ─────────> Winery (N:1)  
Review ─────────> Tour (N:1)
```

---

## Індекси

Для оптимізації запитів створено індекси:
- `User`: `firebaseUid` (unique), `email` (unique)
- `Winery`: `name` (unique), `owner`
- `Wine`: `winery`, `grape`, `color`, `sweetness`, `price`
- `Grape`: `name`, `type`
- `Location`: `name` (unique), `type`, `parentLocation`
- `Review`: `wineId`, `wineryId`, `tourId`, `userId`
- `Tour`: `winery`
