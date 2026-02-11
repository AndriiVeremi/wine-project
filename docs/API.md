# API Documentation

(Примітка: "Захищено" означає, що ендпоінт вимагає дійсний Firebase токен для автентифікації.)

---

## Автентифікація та Користувачі (`/users`)

### **POST** `/api/users/register`
- **Опис:** Реєстрація нового користувача. Цей публічний ендпоінт створює користувача в Firebase Authentication, призначає йому роль (`USER` або `WINERY_OWNER`) і створює профіль користувача в базі даних.
- **Headers:** Не потрібні (публічний).
- **Body:**
  ```json
  {
    "firstName": "Новий Користувач",
    "lastName": "Новий Користувач",
    "email": "new.user@example.com",
    "password": "password123",
    "role": "USER"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "message": "User registered successfully.",
    "user": {
      "id": "60d21b4667d0d8992e610c85",
      "uid": "FIREBASE_UID_HERE",
      "email": "new.user@example.com",
      "firstName": "Новий Користувач",
      "lastName": "Новий Користувач",
      "role": "USER"
    }
  }
  ```

### **GET** `/api/users/me`
- **Опис:** Отримати профіль поточного автентифікованого користувача.
- **Headers:** `Authorization: Bearer <firebase_token>`
- **Response (200 OK):**
  ```json
  {
    "id": "60d21b4667d0d8992e610c85",
    "firebaseUid": "FIREBASE_UID_HERE",
    "firstName": "Іван",
    "lastName": "Франко",
    "email": "ivan.franko@example.com",
    "role": "USER",
    "winery": null,
    "favoriteWines": ["60d21b4667d0d8992e610c99"]
  }
  ```

---

## Улюблені Вина (`/api/users/me/favorites`)

### **GET** `/api/users/me/favorites`
- **Опис:** Отримати список улюблених вин поточного користувача.
- **Headers:** `Authorization: Bearer <firebase_token>`
- **Response (200 OK):**
  ```json
  [
    {
      "id": "60d21b4667d0d8992e610c99",
      "name": "Каберне Совіньйон",
      "winery": { "id": "...", "name": "Виноробня 'Сонячна Долина'" },
      "imageUrl": "https://example.com/wine.png",
      "type": "red",
      "color": "dry"
    }
  ]
  ```

### **POST** `/api/users/me/favorites`
- **Опис:** Додати вино до улюблених.
- **Headers:** `Authorization: Bearer <firebase_token>`
- **Body:**
  ```json
  {
    "wineId": "60d21b4667d0d8992e610c99"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "message": "Wine added to favorites"
  }
  ```

### **DELETE** `/api/users/me/favorites/:wineId`
- **Опис:** Видалити вино з улюблених.
- **Headers:** `Authorization: Bearer <firebase_token>`
- **Response (200 OK):**
  ```json
  {
    "message": "Wine removed from favorites"
  }
  ```

---

## Локації (`/api/locations`)

### **GET** `/api/locations/countries`
- **Опис:** Отримати список об'єктів країн.
- **Response (200 OK):**
  ```json
  [
    { "id": "60d21b4667d0d8992e610c85", "name": "Ukraine", "type": "country" },
    { "id": "60d21b4667d0d8992e610c86", "name": "Georgia", "type": "country" }
  ]
  ```

### **GET** `/api/locations/regions`
- **Опис:** Отримати список об'єктів регіонів для обраної країни.
- **Query Params:** `?countryId=<country_location_id>` (використовуйте ID країни з GET /api/locations/countries)
- **Response (200 OK):**
  ```json
  [
    { "id": "60d21b4667d0d8992e610c87", "name": "Odesa", "type": "region", "parentLocation": "60d21b4667d0d8992e610c85" },
    { "id": "60d21b4667d0d8992e610c88", "name": "Kherson", "type": "region", "parentLocation": "60d21b4667d0d8992e610c85" }
  ]
  ```

---

## Регіони (`/api/regions`)

### **GET** `/api/regions/:name`
- **Опис:** Отримати детальну інформацію про один регіон.
- **Response (200 OK):**
  ```json
  {
    "name": "Kakheti",
    "description": "Kakheti is the principal wine-producing region of Georgia...",
    "imageUrl": "https://example.com/kakheti.png",
    "country": { "id": "...", "name": "Georgia" },
    "climate": {
      "title": "Geographic location and climate",
      "description": "Kakheti lies between...",
      "features": ["warm and dry summers", "mild autumns"]
    },
    "soils": {
      "title": "Soils of Kakheti",
      "description": "The diversity of soils...",
      "mainTypes": ["alluvial soils", "clay-limestone soils"],
      "properties": ["good drainage", "deep vine root systems"]
    },
    "traditions": {
      "title": "Winemaking culture and traditions",
      "description": "Kakheti is the birthplace of qvevri winemaking...",
      "rituals": ["religious rituals", "traditional feasts (supra)"]
    },
    "grapeVarieties": {
      "title": "Main grape varieties of Kakheti",
      "white": [{ "name": "Rkatsiteli", "description": "the most widely planted..." }],
      "red": [{ "name": "Saperavi", "description": "a teinturier grape..." }]
    },
    "typicalWines": {
      "title": "Typical wines of the region",
      "description": "Wines from Kakheti are known for...",
      "styles": ["dry white wines", "amber (orange) wines"]
    },
    "pdos": {
      "title": "Protected Designations of Origin (PDO)",
      "description": "Kakheti contains the highest number...",
      "list": ["Tsinandali", "Mukuzani"]
    },
    "importance": {
      "title": "Importance of Kakheti for Georgian winemaking",
      "description": "Internationally, Kakheti largely shapes...",
      "points": ["the majority of the country’s vineyards..."]
    }
  }
  ```

---

## Виноробні (`/api/wineries`)

### **POST** `/api/wineries`
- **Опис:** Реєстрація нової виноробні. Роль користувача змінюється на `WINERY_OWNER`.
- **Headers:** `Authorization: Bearer <firebase_token>`
- **Body:**
  ```json
  {
    "name": "Виноробня 'Сонячна Долина'",
    "history": "Історія нашої виноробні починається з 1999 року...",
    "country": "60d21b4667d0d8992e610c85", // ID країни з Location
    "region": "60d21b4667d0d8992e610c87", // ID регіону з Location
    "address": "вул. Винна, 1",
    "logoUrl": "https://example.com/logo.png",
    "galleryUrl": ["https://example.com/gallery1.png"],
    "whereToBuy": [
      { "name": "GoodWine", "url": "https://goodwine.ua" }
    ]
  }
  ```
- **Response (201 Created):** Створений об'єкт виноробні.

### **GET** `/api/wineries`
- **Опис:** Отримати список виноробень. **VIP-виноробні завжди відображаються першими.**
- **Query Params:**
  *   `search=Назва` (пошук за назвою)
  *   `countryId=<location_id>` (фільтрація за ID країни з Location)
  *   `regionId=<location_id>` (фільтрація за ID регіону з Location)
  *   `sortBy=name_asc` (поле для сортування, наприклад, `name_asc`, `name_desc`, `country_asc`, `region_desc`)
  *   `page=1` (номер сторінки, за замовчуванням 1)
  *   `limit=10` (кількість елементів на сторінці, за замовчуванням 10)
- **Response (200 OK):**
  ```json
  [
    {
      "id": "60d21b4667d0d8992e610c90",
      "name": "Виноробня 'Сонячна Долина'",
      "owner": "60d21b4667d0d8992e610c81",
      "history": "...",
      "country": { "id": "60d21b4667d0d8992e610c85", "name": "Ukraine", "type": "country" },
      "region": { "id": "60d21b4667d0d8992e610c87", "name": "Odesa", "type": "region", "parentLocation": "60d21b4667d0d8992e610c85" },
      "address": "...",
      "isVip": true,
      "logoUrl": "...",
      "galleryUrl": ["..."],
      "whereToBuy": [...]
    }
  ]
  ```

### **GET** `/api/wineries/:id`
- **Опис:** Отримати повну інформацію про одну виноробню.
- **Response (200 OK):** Детальний об'єкт виноробні, що включає масив її вин.

### **PATCH** `/api/wineries/:id`
- **Опис:** Оновити інформацію про свою виноробню (тільки власник або адмін).
- **Headers:** `Authorization: Bearer <firebase_token>`
- **Body:**
  ```json
  {
    "history": "Оновлена історія нашої виноробні...",
    "address": "вул. Нова, 123"
  }
  ```
- **Response (200 OK):** Оновлений об'єкт виноробні.

---

## Адміністрування (`/api/admin`)

### **PATCH** `/api/admin/wineries/:id/vip`
- **Опис:** Встановити або зняти VIP-статус для виноробні.
- **Headers:** `Authorization: Bearer <admin_firebase_token>`
- **Body:**
  ```json
  {
    "isVip": true
  }
  ```
- **Response (200 OK):** Оновлений об'єкт виноробні.

---

## Вина (`/api/wines`)

### **GET** `/api/wines`
- **Опис:** Отримати список вин з гнучкою фільтрацією. **Вина від VIP-виноробень завжди відображаються першими.**
- **Query Params:** `?type=red&color=dry&minRating=4&maxPrice=1000&sortBy=price_asc`
- **Response (200 OK):** `[ { wine1 }, { wine2 }, ... ]`

### **GET** `/api/wines/:id`
- **Опис:** Отримати детальну інформацію про одне вино.
- **Response (200 OK):** Детальний об'єкт вина.

### **POST** `/api/wines`
- **Опис:** Додати нове вино (тільки власник виноробні або адмін).
- **Headers:** `Authorization: Bearer <firebase_token>`
- **Body:**
  ```json
  {
    "name": "Каберне Совіньйон Резерв",
    "vintage": 2021,
    "grape": "Каберне Совіньйон",
    "price": 750,
    "description": "Класичне червоне вино з насиченим смаком вишні та смородини.",
    "tastingNotes": ["вишня", "смородина", "дуб", "ваніль"],
    "imageUrl": "https://example.com/wine.png",
    "type": "red",
    "color": "dry"
  }
  ```
- **Response (201 Created):** Створений об'єкт вина.

### **PATCH** `/api/wines/:id`
- **Опис:** Оновити інформацію про вино (тільки власник або адмін).
- **Headers:** `Authorization: Bearer <firebase_token>`
- **Body:**
  ```json
  {
    "description": "Оновлений опис вина.",
    "vintage": 2022,
    "price": 800
  }
  ```
- **Response (200 OK):** Оновлений об'єкт вина.

### **DELETE** `/api/wines/:id`
- **Опис:** Видалити вино (тільки власник або адмін).
- **Headers:** `Authorization: Bearer <firebase_token>`
- **Response (204 No Content):** Немає тіла відповіді.

---

## Відгуки (`/api/wines/:wineId/reviews`)

### **GET** `/api/wines/:wineId/reviews`
- **Опис:** Отримати всі відгуки для конкретного вина.
- **Response (200 OK):** `[ { review1 }, { review2 }, ... ]`

### **POST** `/api/wines/:wineId/reviews`
- **Опис:** Додати новий відгук до вина.
- **Headers:** `Authorization: Bearer <firebase_token>`
- **Body:**
  ```json
  {
    "rating": 5,
    "comment": "Це найкраще вино, що я куштував! Насичений смак та аромат."
  }
  ```
- **Response (201 Created):** Створений об'єкт відгуку.

---

## Сорти Винограду (`/api/grapes`)

### **GET** `/api/grapes`
- **Опис:** Отримати список усіх сортів винограду.
- **Query Params:** `?search=Chard`
- **Response (200 OK):**
  ```json
  [
    { "id": "...", "name": "Chardonnay" },
    { "id": "...", "name": "Charlemange" }
  ]
  ```

---

## Винні Тури (`/api/tours`)

### **GET** `/api/tours`
- **Опис:** Отримати список усіх доступних турів.
- **Query Params:** `?wineryId=...`
- **Response (200 OK):** `[ { tour1 }, { tour2 }, ... ]`

### **GET** `/api/tours/:id`
- **Опис:** Отримати детальну інформацію про один тур.
- **Response (200 OK):** Детальний об'єкт туру.

### **POST** `/api/tours`
- **Опис:** Додати новий тур (тільки власник виноробні або адмін).
- **Headers:** `Authorization: Bearer <firebase_token>`
- **Body:**
  ```json
  {
      "name": "Дегустаційний тур 'Серце виноробні'",
      "description": "Екскурсія по виноградниках, відвідування виробництва та дегустація 5 видів вин.",
      "duration": 3,
      "price": 1500,
      "images": ["https://example.com/tour1.png", "https://example.com/tour2.png"],
      "groupSize": { "min": 2, "max": 10 }
  }
  ```
- **Response (201 Created):** Створений об'єкт туру.