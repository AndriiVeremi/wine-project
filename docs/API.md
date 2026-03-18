# API Documentation

> **Важливо:** Актуальна, інтерактивна документація доступна в Swagger UI: [http://localhost:5005/api-docs](http://localhost:5005/api-docs)

---

## Автентифікація

Всі захищені ендпоінти вимагають Firebase JWT токен у заголовку:

```
Authorization: Bearer <firebase_id_token>
```

### Ролі
| Роль | Опис |
|------|------|
| `USER` | Звичайний користувач |
| `WINERY_OWNER` | Власник виноробні |
| `ADMIN` | Адміністратор |

---

## Користувачі (`/api/users`)

### Реєстрація
```
POST /api/users/register
```
**Body:**
```json
{
  "firstName": "Іван",
  "lastName": "Петренко",
  "email": "ivan@example.com",
  "password": "securepassword",
  "role": "USER"
}
```

### Профіль користувача (захищено)
```
GET /api/users/me
PATCH /api/users/me
```
**Оновлення профілю Body:**
```json
{
  "firstName": "НовеІм'я",
  "lastName": "НовеПрізвище",
  "phone": "+380991234567",
  "birthDate": "1990-01-15",
  "address": "м. Київ, вул. Хрещатик 1"
}
```

### Аватар (захищено)
```
PATCH /api/users/me/avatar
```
**FormData:** `avatar` (файл зображення)

### Улюблені вина (захищено)
```
GET /api/users/me/favorites
POST /api/users/me/favorites
DELETE /api/users/me/favorites/:wineId
```
**Додати до улюблених Body:**
```json
{
  "wineId": "60d5ec49f1b2c8a1234567890"
}
```

### Мої відгуки (захищено)
```
GET /api/users/me/reviews
```

### Адмін: Всі користувачі (ADMIN)
```
GET /api/users
```

### Адмін: Заблокувати користувача (ADMIN)
```
PATCH /api/users/:id/ban
```

### Адмін: Видалити користувача (ADMIN)
```
DELETE /api/users/:id
```

---

## Вина (`/api/wines`)

### Отримати всі вина
```
GET /api/wines
```
**Query параметри:**
| Параметр | Тип | Опис |
|----------|-----|------|
| `page` | number | Сторінка (default: 1) |
| `limit` | number | Елементів на сторінку (default: 12) |
| `color` | string | red, white, rose, orange |
| `sweetness` | string | dry, semi-dry, semi-sweet, sweet |
| `grape` | string | ID сорту винограду |
| `region` | string | ID регіону |
| `minPrice` | number | Мінімальна ціна |
| `maxPrice` | number | Максимальна ціна |
| `minRating` | number | Мінімальний рейтинг |
| `vintage` | number | Рік врожаю |
| `search` | string | Пошук по назві |

### Отримати вино за ID
```
GET /api/wines/:id
```

### Створити вино (WINERY_OWNER, ADMIN)
```
POST /api/wines
```
**FormData:**
```
name: string (required)
winery: string (ID, required)
vintage: number (required)
grape: string (ID, required)
price: number (required)
color: string (required)
sweetness: string (required)
description: string
tastingNotes: string[]
image: file (optional)
```

### Оновити вино (WINERY_OWNER, ADMIN)
```
PATCH /api/wines/:id
```

### Видалити вино (WINERY_OWNER, ADMIN)
```
DELETE /api/wines/:id
```

### Оновити зображення вина (WINERY_OWNER, ADMIN)
```
PATCH /api/wines/:id/image
```
**FormData:** `image` (файл)

---

## Виноробні (`/api/wineries`)

### Отримати всі виноробні
```
GET /api/wineries
```
**Query параметри:**
| Параметр | Тип | Опис |
|----------|-----|------|
| `page` | number | Сторінка |
| `limit` | number | Елементів на сторінку |
| `country` | string | ID країни |
| `minRating` | number | Мінімальний рейтинг |
| `isVip` | boolean | Тільки VIP |
| `search` | string | Пошук по назві |

### Отримати виноробню за ID
```
GET /api/wineries/:id
```

### Створити виноробню (WINERY_OWNER, ADMIN)
```
POST /api/wineries
```
**FormData:**
```
name: string (required)
history: string
country: string (ID)
region: string (ID)
address: string
websiteUrl: string
contactEmail: string
contactPhone: string
videoUrl: string
logo: file (optional)
gallery: file[] (optional)
```

### Оновити виноробню (WINERY_OWNER, ADMIN)
```
PATCH /api/wineries/:id
```

### Видалити виноробню (ADMIN)
```
DELETE /api/wineries/:id
```

### Відгуки виноробні
```
GET /api/wineries/:id/reviews
```

---

## Сорти винограду (`/api/grapes`)

### Отримати всі сорти
```
GET /api/grapes
```
**Query параметри:**
| Параметр | Тип | Опис |
|----------|-----|------|
| `page` | number | Сторінка |
| `limit` | number | Елементів на сторінку |
| `type` | string | red, white, rose |
| `region` | string | ID регіону |

### Отримати сорт за ID
```
GET /api/grapes/:id
```

### Створити сорт (WINERY_OWNER, ADMIN)
```
POST /api/grapes
```
**Body:**
```json
{
  "name": "Каберне Совіньйон",
  "description": "Найпопулярніший червоний сорт...",
  "type": "red",
  "alsoKnownAs": ["Cabernet Sauvignon"],
  "characteristics": ["висока кислотність", "таніни"],
  "foodPairing": ["червоне м'ясо", "сири"],
  "acidity": "висока",
  "body": "повне",
  "tannins": "високі",
  "aromas": ["чорна смородина", " cedar"],
  "agingPotential": "10-20 років"
}
```

### Оновити сорт (WINERY_OWNER, ADMIN)
```
PATCH /api/grapes/:id
```

### Видалити сорт (ADMIN)
```
DELETE /api/grapes/:id
```

---

## Локації (`/api/locations`)

### Отримати країни
```
GET /api/locations/countries
```

### Отримати регіони
```
GET /api/locations/regions
GET /api/locations/regions?country=:countryId
```

---

## Регіони (`/api/regions`)

### Отримати всі регіони
```
GET /api/regions
GET /api/regions?country=:countryName
```

### Отримати регіон за назвою
```
GET /api/regions/:name
```

---

## Відгуки (`/api/reviews`)

### Отримати відгук за ID
```
GET /api/reviews/:id
```

### Створити відгук (захищено)
```
POST /api/reviews
```
**Body:**
```json
{
  "rating": 5,
  "comment": "Чудове вино!",
  "wineId": "60d5ec49f1b2c8a1234567890"
}
```
Або для виноробні:
```json
{
  "rating": 4,
  "comment": "Гарна виноробня",
  "wineryId": "60d5ec49f1b2c8a1234567891"
}
```

### Оновити відгук (автор або ADMIN)
```
PATCH /api/reviews/:id
```

### Видалити відгук (автор або ADMIN)
```
DELETE /api/reviews/:id
```

### Адмін: Всі відгуки
```
GET /api/admin/reviews
GET /api/admin/reviews?type=wines
GET /api/admin/reviews?type=wineries
GET /api/admin/reviews?type=tours
```

### Адмін: Видалити відгук
```
DELETE /api/admin/reviews/:id
```

---

## Тури (`/api/tours`)

### Отримати всі тури
```
GET /api/tours
```
**Query параметри:**
| Параметр | Тип | Опис |
|----------|-----|------|
| `page` | number | Сторінка |
| `limit` | number | Елементів на сторінку |
| `winery` | string | ID виноробні |

### Отримати тур за ID
```
GET /api/tours/:id
```

### Створити тур (WINERY_OWNER, ADMIN)
```
POST /api/tours
```
**Body:**
```json
{
  "winery": "60d5ec49f1b2c8a1234567890",
  "name": "Дегустаційний тур",
  "description": "Тур з дегустацією 5 вин",
  "duration": 120,
  "price": 500,
  "groupSize": { "min": 2, "max": 10 },
  "images": ["url1", "url2"]
}
```

### Оновити тур (WINERY_OWNER, ADMIN)
```
PATCH /api/tours/:id
```

### Видалити тур (WINERY_OWNER, ADMIN)
```
DELETE /api/tours/:id
```

### Відгуки туру
```
GET /api/tours/:id/reviews
```

---

## AI-помічник (`/api/ai`)

### Чат з AI (захищено)
```
POST /api/ai/chat
```
**Body:**
```json
{
  "message": "Яке вино ви порадите до стейка?",
  "history": [
    { "role": "user", "parts": ["Раніше я любив білі вина"] },
    { "role": "model", "parts": ["Дякую за інформацію!"] }
  ]
}
```

**Response:**
```json
{
  "response": "До стейка я б порадив вам червоне вино..."
}
```

### Доступні інструменти AI
| Функція | Опис |
|---------|------|
| `searchWines` | Пошук вин за критеріями |
| `getRegionInfo` | Інформація про регіон |
| `getWineryInfo` | Інформація про виноробню |
| `searchTours` | Пошук турів |
| `getMyFavoriteWines` | Улюблені вина користувача |

---

## Відповіді

### Успіх
```json
{
  "wines": [...],
  "totalCount": 100,
  "page": 1,
  "limit": 12,
  "totalPages": 9
}
```

### Помилка
```json
{
  "statusCode": 400,
  "message": "Validation error",
  "errors": [
    { "field": "email", "message": "Invalid email format" }
  ]
}
```

### HTTP статуси
| Код | Опис |
|-----|------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Too Many Requests |
| 500 | Internal Server Error |
