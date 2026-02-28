> **Примітка:** Цей документ містить опис API. Актуальну, інтерактивну та завжди оновлену документацію можна знайти в Swagger UI за адресою: [http://localhost:5005/api-docs](http://localhost:5005/api-docs).

---

# API Documentation

(Примітка: "Захищено" означає, що ендпоінт вимагає дійсний Firebase токен для автентифікації.)

---

## Автентифікація та Користувачі (`/users`)

### **POST** `/api/users/register`
- **Опис:** Реєстрація нового користувача. Цей публічний ендпоінт створює користувача в Firebase Authentication, призначає йому роль (`USER` або `WINERY_OWNER`) і створює профіль користувача в базі даних.
- **Headers:** Not required.
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
    "message": "Registered successfully.",
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
- **Errors:**
  - `400`: Invalid input or user already exists
  - `500`: Server error

### **GET** `/api/users/me`
- **Опис:** Отримати профіль поточного користувача.
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
- **Errors:**
  - `401`: Unauthorized
  - `404`: User not found
  - `500`: Server error

---

## Улюблені Вина (`/api/users/me/favorites`)

### **GET** `/api/users/me/favorites`
- **Опис:** Отримати список улюблених вин.
- **Headers:** `Authorization: Bearer <firebase_token>`
- **Response (200 OK):**
  ```json
  [
    {
      "id": "60d21b4667d0d8992e610c99",
      "name": "Каберне Совіньйон",
      "winery": { "id": "...", "name": "Виноробня 'Сонячна Долина'" },
      "imageUrl": "https://example.com/wine.png",
      "color": "red",
      "sweetness": "dry"
    }
  ]
  ```
- **Errors:**
  - `401`: Unauthorized
  - `500`: Server error

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
- **Errors:**
  - `400`: Wine already in favorites
  - `404`: Wine not found

### **DELETE** `/api/users/me/favorites/:wineId`
- **Опис:** Видалити вино з улюблених.
- **Headers:** `Authorization: Bearer <firebase_token>`
- **Response (200 OK):**
  ```json
  {
    "message": "Wine removed from favorites"
  }
  ```
- **Errors:**
  - `404`: Wine not found

---

## Локації (`/api/locations`)

### **GET** `/api/locations/countries`
- **Опис:** Отримати список унікальних країн.
- **Response (200 OK):**
  ```json
  [
    { "id": "60d21b4667d0d8992e610c85", "name": "Ukraine", "type": "country" },
    { "id": "60d21b4667d0d8992e610c86", "name": "Georgia", "type": "country" }
  ]
  ```
- **Errors:**
  - `500`: Server error

### **GET** `/api/locations/regions`
- **Опис:** Отримати список регіонів для вказаної країни.
- **Query Params:** `?country=<country_name>`
- **Response (200 OK):**
  ```json
  [
    { "id": "60d21b4667d0d8992e610c87", "name": "Odesa", "type": "region", "parentLocation": "60d21b4667d0d8992e610c85" },
    { "id": "60d21b4667d0d8992e610c88", "name": "Kherson", "type": "region", "parentLocation": "60d21b4667d0d8992e610c85" }
  ]
  ```
- **Errors:**
  - `400`: Country query parameter is required
  - `500`: Server error

---

## Регіони (`/api/regions`)

### **GET** `/api/regions/:name`
- **Опис:** Отримати детальну інформацію про регіон за його назвою.
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
- **Errors:**
  - `404`: Region not found
  - `500`: Server error

---

## Виноробні (`/api/wineries`)

### **POST** `/api/wineries`
- **Опис:** Реєстрація нової виноробні. Потребує ролі `WINERY_OWNER`.
- **Headers:** `Authorization: Bearer <firebase_token>`
- **Body:**
  ```json
  {
    "name": "Виноробня 'Сонячна Долина'",
    "history": "Історія нашої виноробні починається з 1999 року...",
    "country": "60d21b4667d0d8992e610c85",
    "region": "60d21b4667d0d8992e610c87",
    "address": "вул. Винна, 1",
    "logoUrl": "https://example.com/logo.png",
    "galleryUrl": ["https://example.com/gallery1.png"],
    "whereToBuy": [
      { "name": "GoodWine", "url": "https://goodwine.ua" }
    ]
  }
  ```
- **Response (201 Created):** Created winery object.
- **Errors:**
  - `400`: Invalid input
  - `401`: Unauthorized
  - `409`: Winery with this name already exists
  - `500`: Server error

### **GET** `/api/wineries`
- **Опис:** Отримати список виноробень. **VIP-виноробні завжди відображаються першими в списку.**
- **Query Params:**
  *   `search=Назва` (search by name)
  *   `countryId=<location_id>` (filter by country ID)
  *   `regionId=<location_id>` (filter by region ID)
  *   `sortBy=name_asc` (sort by field, e.g., `name_asc`, `name_desc`, `country_asc`, `region_desc`)
  *   `page=1` (page number, default 1)
  *   `limit=10` (items per page, default 10)
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
- **Errors:**
  - `500`: Server error

### **GET** `/api/wineries/:id`
- **Опис:** Отримати повну інформацію про виноробню.
- **Response (200 OK):** Detailed winery object.
- **Errors:**
  - `404`: Winery not found
  - `500`: Server error

### **PATCH** `/api/wineries/:id`
- **Опис:** Оновити інформацію про виноробню (тільки власник або адмін).
- **Headers:** `Authorization: Bearer <firebase_token>`
- **Body:**
  ```json
  {
    "history": "Оновлена історія нашої виноробні...",
    "address": "вул. Нова, 123"
  }
  ```
- **Response (200 OK):** Updated winery object.
- **Errors:**
  - `400`: Invalid input
  - `401`: Unauthorized
  - `403`: Forbidden
  - `404`: Winery not found
  - `500`: Server error

### **DELETE** `/api/wineries/:id`
- **Опис:** Видалити виноробню (тільки власник або адмін).
- **Headers:** `Authorization: Bearer <firebase_token>`
- **Response (204 No Content):** No body.
- **Errors:**
  - `401`: Unauthorized
  - `403`: Forbidden (user is not an admin or the owner)
  - `404`: Winery not found

---

## Адміністрування (`/api/admin`)

### **PATCH** `/api/admin/wineries/:id/vip`
- **Опис:** Встановити або зняти VIP-статус для виноробні (тільки адмін).
- **Headers:** `Authorization: Bearer <admin_firebase_token>`
- **Body:**
  ```json
  {
    "isVip": true
  }
  ```
- **Response (200 OK):** Updated winery object.
- **Errors:**
  - `401`: Unauthorized
  - `403`: Forbidden
  - `404`: Winery not found
  - `500`: Server error

---

## Вина (`/api/wines`)

### **GET** `/api/wines`
- **Опис:** Отримати список вин з гнучкою фільтрацією. **Вина від VIP-виноробень завжди відображаються першими.**
- **Query Params:**
  *   `color=red&sweetness=dry&minRating=4&maxPrice=1000&sortBy=price_asc`
  *   `regionId=<location_id>` (filter by region ID)
- **Response (200 OK):** Array of wine objects.
- **Errors:**
  - `500`: Server error

### **GET** `/api/wines/:id`
- **Опис:** Отримати детальну інформацію про вино.
- **Response (200 OK):** Detailed wine object.
- **Errors:**
  - `404`: Wine not found
  - `500`: Server error

### **POST** `/api/wines`
- **Опис:** Додати нове вино (тільки власник виноробні або адмін).
- **Headers:** `Authorization: Bearer <firebase_token>`
- **Body:**
  ```json
  {
    "name": "Каберне Совіньйон Резерв",
    "winery": "60d21b4667d0d8992e610c90",
    "vintage": 2021,
    "grape": "60d21b4667d0d8992e610c91",
    "price": 750,
    "description": "Класичне червоне вино з насиченим смаком вишні та смородини.",
    "tastingNotes": ["вишня", "смородина", "дуб", "ваніль"],
    "imageUrl": "https://example.com/wine.png",
    "color": "red",
    "sweetness": "dry"
  }
  ```
- **Response (201 Created):** Created wine object.
- **Errors:**
  - `400`: Invalid input
  - `401`: Unauthorized
  - `403`: Forbidden
  - `500`: Server error

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
- **Response (200 OK):** Updated wine object.
- **Errors:**
  - `400`: Invalid input
  - `401`: Unauthorized
  - `403`: Forbidden
  - `404`: Wine not found
  - `500`: Server error

### **DELETE** `/api/wines/:id`
- **Опис:** Видалити вино (тільки власник або адмін).
- **Headers:** `Authorization: Bearer <firebase_token>`
- **Response (204 No Content):** No body.
- **Errors:**
  - `401`: Unauthorized
  - `403`: Forbidden
  - `404`: Wine not found
  - `500`: Server error

---

## Відгуки (`/api/wines/:wineId/reviews`)

### **GET** `/api/wines/:wineId/reviews`
- **Опис:** Отримати всі відгуки для конкретного вина.
- **Response (200 OK):**
  ```json
  [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "wineId": "60d21b4667d0d8992e610c99",
      "userId": { "_id": "60d21b4667d0d8992e610c81", "firstName": "Іван", "lastName": "Франко" },
      "rating": 5,
      "comment": "Чудове вино! Насичений смак вишні та смородини.",
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "60d21b4667d0d8992e610c86",
      "wineId": "60d21b4667d0d8992e610c99",
      "userId": { "_id": "60d21b4667d0d8992e610c82", "firstName": "Марія", "lastName": "Шевчук" },
      "rating": 4,
      "comment": "Добре вино, але трохи занадто кисле.",
      "createdAt": "2024-01-10T14:20:00.000Z"
    }
  ]
  ```
- **Errors:**
  - `404`: Wine not found
  - `500`: Server error

### **POST** `/api/wines/:wineId/reviews`
- **Опис:** Додати новий відгук до вина. Користувач може залишити лише один відгук для кожного вина.
- **Headers:** `Authorization: Bearer <firebase_token>`
- **Body:**
  ```json
  {
    "rating": 5,
    "comment": "Це найкраще вино, що я куштував! Відпад."
  }
  ```
- **Response (201 Created):** Created review object.
- **Errors:**
  - `400`: You have already reviewed this wine
  - `401`: Unauthorized
  - `404`: Wine not found
  - `500`: Server error

---

## Сорти Винограду (`/api/grapes`)

### **GET** `/api/grapes`
- **Опис:** Отримати список сортів винограду.
- **Query Params:** `?search=Chard`
- **Response (200 OK):**
  ```json
  [
    { "id": "...", "name": "Chardonnay" },
    { "id": "...", "name": "Charlemange" }
  ]
  ```
- **Errors:**
  - `500`: Server error

---

## Винні Тури (`/api/tours`)



### **GET** `/api/tours`

- **Опис:** Отримати список всіх турів з пагінацією.

- **Query Params:** `?page=<номер>&limit=<кількість>`

- **Response (200 OK):** Array of tour objects.

- **Errors:**

  - `500`: Server error



### **GET** `/api/tours/winery/:wineryId`

- **Опис:** Отримати всі тури конкретної виноробні.

- **Response (200 OK):** Array of tour objects.

- **Errors:**

  - `404`: Winery not found

  - `500`: Server error



### **GET** `/api/tours/:id`

- **Опис:** Отримати детальну інформацію про тур.

- **Response (200 OK):** Detailed tour object.

- **Errors:**

  - `404`: Tour not found

  - `500`: Server error



### **POST** `/api/tours`

- **Опис:** Додати новий тур (тільки власник виноробні або адмін).

- **Headers:** `Authorization: Bearer <firebase_token>`

- **Body:**

  ```json
  {
      "winery": "60d21b4667d0d8992e610c90",
      "name": "Дегустаційний тур 'Серце виноробні'",
      "description": "Екскурсія по виноградниках, відвідування виробництва та дегустація 5 видів вин.",
      "duration": 3,
      "price": 1500,
      "images": ["https://example.com/tour1.png", "https://example.com/tour2.png"],
      "groupSize": { "min": 2, "max": 10 }
  }
  ```

- **Response (201 Created):** Created tour object.

- **Errors:**

  - `400`: Invalid input
  - `401`: Unauthorized
  - `403`: Forbidden
  - `500`: Server error

### **PATCH** `/api/tours/:id`

- **Опис:** Оновити інформацію про тур (тільки власник виноробні або адмін).

- **Headers:** `Authorization: Bearer <firebase_token>`

- **Body:**

  ```json
  {
      "name": "Оновлена назва туру",
      "description": "Оновлений опис туру.",
      "duration": 4,
      "price": 1800
  }
  ```

- **Response (200 OK):** Updated tour object.

- **Errors:**

  - `400`: Invalid input
  - `401`: Unauthorized
  - `403`: Forbidden (user is not the owner or admin)
  - `404`: Tour not found
  - `500`: Server error

### **DELETE** `/api/tours/:id`

- **Опис:** Видалити тур (тільки власник виноробні або адмін).

- **Headers:** `Authorization: Bearer <firebase_token>`

- **Response (204 No Content):** No body.

- **Errors:**

  - `401`: Unauthorized
  - `403`: Forbidden (user is not the owner or admin)
  - `404`: Tour not found
  - `500`: Server error

---

## ШІ-помічник (`/api/ai`)

### **POST** `/api/ai/chat`
- **Опис:** Надіслати повідомлення до ШІ-помічника та отримати відповідь. Захищено.
- **Headers:** `Authorization: Bearer <firebase_token>`
- **Body:**
  ```json
  {
    "message": "Привіт, допоможи вибрати вино!",
    "history": [
      {
        "role": "user",
        "parts": [{ "text": "Попереднє повідомлення" }]
      },
      {
        "role": "model",
        "parts": [{ "text": "Попередня відповідь" }]
      }
    ]
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "response": "Звісно! Яке вино ви полюбляєте: червоне, біле, рожеве?"
  }
  ```
- **Errors:**
  - `400`: Помилка валідації
  - `401`: Неавторизований
  - `429`: Забагато запитів
  - `500`: Помилка сервера
  - `503`: ШІ-помічник вимкнений адміністратором
