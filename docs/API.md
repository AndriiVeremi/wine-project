> **Примітка:** Цей документ містить опис API. Актуальну, інтерактивну та завжди оновлену документацію можна знайти в Swagger UI за адресою: [http://localhost:5005/api-docs](http://localhost:5005/api-docs).

---

# API Documentation

(Примітка: "Захищено" означає, що ендпоінт вимагає дійсний Firebase токен для автентифікації.)

---

## Користувачі (`/api/users`)
*Див. попередню версію або Swagger.*

---

## Виноробні (`/api/wineries`)
*Див. попередню версію або Swagger.*

---

## Сорти винограду (`/api/grapes`)

### **GET** `/api/grapes`
- **Опис:** Список всіх сортів винограду.

### **POST** `/api/grapes`
- **Опис:** Додати новий сорт. Захищено (WINERY_OWNER, ADMIN).
- **Body:** `{ name, description, origin, characteristics }`

---

## Локації та Регіони (`/api/locations` та `/api/regions`)

### **GET** `/api/locations/countries`
- **Опис:** Отримати список країн.

### **GET** `/api/locations/regions`
- **Опис:** Отримати список регіонів.

---

## ШІ-помічник (`/api/ai`)

### **POST** `/api/ai/chat`
- **Опис:** Чат із віртуальним сомельє.
- **Body:** `{ message, history }`
- **Особливості:** Підтримує Function Calling для пошуку реальних даних (вина, тури, виноробні) у базі проекту.
- **Response:** `{ response: "Текст відповіді ШІ" }`

---

## Адміністрування
*Див. Swagger.*
