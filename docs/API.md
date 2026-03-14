> **Примітка:** Цей документ містить опис API. Актуальну, інтерактивну та завжди оновлену документацію можна знайти в Swagger UI за адресою: [http://localhost:5005/api-docs](http://localhost:5005/api-docs).

---

# API Documentation

(Примітка: "Захищено" означає, що ендпоінт вимагає дійсний Firebase токен для автентифікації.)

---

## Користувачі та Адміністрування (`/users`)

### **POST** `/api/users/register`
- **Опис:** Реєстрація нового користувача.
- **Body:** `{ firstName, lastName, email, password, role }`
- **Response (201 Created):** Created user profile.

### **GET** `/api/users/me`
- **Опис:** Отримати профіль поточного користувача. Захищено.

### **GET** `/api/users`
- **Опис:** Отримати список всіх користувачів (тільки для ADMIN).
- **Query Params:** `?search=<text>&page=1&limit=10`

### **PATCH** `/api/users/:id/ban`
- **Опис:** Заблокувати/розблокувати користувача (тільки для ADMIN).

### **DELETE** `/api/users/:id`
- **Опис:** Видалити користувача (тільки для ADMIN).

---

## Виноробні (`/api/wineries`)

### **GET** `/api/wineries`
- **Опис:** Список виноробень. VIP-виноробні перші.
- **Query Params:** `?search, countryId, regionId, sortBy, page, limit`

### **PATCH** `/api/wineries/:id/vip`
- **Опис:** Переключити VIP-статус виноробні (тільки для ADMIN).

---

## Відгуки (`/api/reviews` та вкладені)

### **GET** `/api/wines/:id/reviews`
### **GET** `/api/wineries/:id/reviews`
### **GET** `/api/tours/:id/reviews`
- **Опис:** Отримати відгуки для конкретного об'єкта.

### **POST** `/api/wines/:id/reviews`
### **POST** `/api/wineries/:id/reviews`
### **POST** `/api/tours/:id/reviews`
- **Опис:** Додати відгук. Захищено.
- **Body:** `{ rating, comment }`

### **GET** `/api/reviews`
- **Опис:** Отримати всі відгуки системи для модерації (тільки для ADMIN).

### **DELETE** `/api/reviews/:reviewId`
- **Опис:** Видалити будь-який відгук (тільки для ADMIN).

---

## Вина та Тури

Логіка залишається стандартною (CRUD), де ADMIN має доступ до видалення/редагування будь-яких об'єктів, а WINERY_OWNER лише до своїх.
Всі операції з видалення та створення нових об'єктів для адміна та власника тепер підтримують рольову модель.
