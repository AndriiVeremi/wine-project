# Таски для команди Wine Project

---

## Бекенд (Backend)

### Epic 1: Налаштування Проєкту та Базова Архітектура
**Виконавець:** Андрій Веремій ✅

- [x] Task: Ініціалізувати Node.js проєкт (Express.js), налаштувати структуру папок.
- [x] Task: Налаштувати підключення до MongoDB за допомого- [x]ю Mongoose.
 Task: Інтегрувати Firebase Admin SDK для верифікації JWT токенів.
- [x] Task: Створити middleware для автентифікації (перевірка токену).
- [x] Task: Створити middleware для авторизації (перевірка ролей: USER, WINERY_OWNER, ADMIN).
- [x] Task: Створити глобальний middleware для обробки помилок.
- [x] Task: Налаштувати валідацію вхідних даних (joi).
- [x] Task: Налаштувати Jest та базову конфігурацію для тестування.

---

### Epic 2: Реалізація Моделей Даних
**Виконавець:** Андрій Веремій ✅

- [x] Task: Створити Mongoose схеми для User, Winery, Grape.
- [x] Task: Створити Mongoose схеми для Wine та Review.
- [x] Task: Створити Mongoose схеми для Tour.
- [x] Task: Створити скрипти для наповнення бази даних (seeding).

---

### Epic 3: Розробка API для Користувачів та Виноробень
**Виконавець:** Андрій Веремій ✅

- [x] Task: Створити файли user.routes.ts, winery.routes.ts та підключити їх в index.ts.
- [x] Task: Створити файли user.controller.ts, winery.controller.ts.
- [x] Task: Створити файли user.service.ts, winery.service.ts.
- [x] Task: Реалізувати ендпоінт GET /users/me.
- [x] Task: Реалізувати ендпоінт POST /wineries/register-winery.
- [x] Task: Реалізувати ендпоінти GET /wineries.
- [x] Task: Реалізувати ендпоінти GET /wineries/:id.
- [x] Task: Реалізувати ендпоінт PATCH /wineries/:id.

---

### Epic 4: Розробка API для Вина та Фільтри
**Виконавець:** Ігор Дикій ✅

- [x] Task: Створити файли wineRoutes.ts, wineController.ts, wineService.ts, wineSchemas.ts.
- [x] Task: Підключити wineRoutes.ts в index.ts.
- [x] Task: Реалізувати CRUD ендпоінти для вин.
- [x] Task: Реалізувати ендпоінт GET /wines з фільтрацією.

---

### Epic 5: Розробка API для Сорти Винограду та Локації
**Виконавець:** Андрій Веремій ✅

- [x] Task: Створити файли grapeRoutes.ts, grapeController.ts, grapeService.ts.
- [x] Task: Створити файли locationRoutes.ts, locationController.ts, locationService.ts.
- [x] Task: Підключити grapeRoutes.ts та locationRoutes.ts в index.ts.
- [x] Task: Реалізувати ендпоінт GET /grapes.
- [x] Task: Реалізувати ендпоінт GET /locations/countries.
- [x] Task: Реалізувати ендпоінт GET /locations/regions.

---

### Epic 6: Розробка API для Відгуки та Улюблені Вина
**Виконавець:** Андрій Попов ✅

- [x] Task: Створити файли reviewRoutes.ts, reviewController.ts, reviewService.ts, reviewSchemas.ts.
- [x] Task: Реалізувати ендпоінти GET /wines/:wineId/reviews
- [x] Task: Реалізувати ендпоінти POST /wines/:wineId/reviews.
- [x] Task: Реалізувати ендпоінт PATCH /wines/:wineId/reviews/:reviewsId
- [x] Task: Реалізувати ендпоінт DELETE /wines/:wineId/reviews/:reviewsId
- [x] Task: Реалізувати ендпоінти GET /users/me/favorites
- [x] Task: Реалізувати ендпоінти POST /users/me/favorites
- [x] Task: Реалізувати ендпоінти DELETE /users/me/favorites/:wineId.

---

### Epic 7: Розробка API для Турів
**Виконавець:** Владислав Мазуркевич ✅

- [x] Task: Створити файли tourRoutes.ts, tourController.ts, tourService.ts.
- [x] Task: Підключити tourRoutes.ts в index.ts.
- [x] Task: Реалізувати ендпоінти GET /tours.
- [x] Task: Реалізувати ендпоінт GET /tours/:id.
- [x] Task: Реалізувати ендпоінт POST /tours.
- [x] Task: Реалізувати ендпоінт GET /tours/winery/:wineryId.
- [x] Task: Реалізувати ендпоінт DELETE /tours/:id.

---

### Epic 8: Розробка API для Сторінки Регіону
**Виконавець:** Андрій Попов 

- [x] Task: Створити модель regionModel.ts.
- [ ] Task: Створити файли regionRoutes.ts, regionController.ts, regionService.ts, regionSchemas.ts.
- [ ] Task: Підключити regionRoutes.ts до api.ts.
- [ ] Task: Реалізувати ендпоінт GET /api/regions/:name.

---

### Epic 9: Розробка API для ШІ-помічника
**Виконавець:** Андрій Веремій ✅

- [x] Task: Створити файли aiRoutes.ts, aiController.ts, aiService.ts, aiSchemas.ts.
- [x] Task: Підключити aiRoutes.ts до api.ts.
- [x] Task: Реалізувати ендпоінт POST /api/ai/chat.
- [x] Task: Інтегрувати Google Generative AI (gemini) для генерації відповідей.
- [x] Task: Додати системний промпт для контексту винної тематики.
- [x] Task: Реалізувати перевірку доступності AI (AI_ASSISTANT_ENABLED).
- [x] Task: Налаштувати .env змінні GEMINI_API_KEY та AI_ASSISTANT_ENABLED.

---

### Epic 10: Деплой, Документація та Якість
**Виконавець:** Андрій Веремій 

- [x] Task: Налаштувати змінні середовища (.env).
- [x] Task: Написати API документацію Swagger.
- [ ] Task: Налаштувати CI/CD (GitHub Actions).
- [x] Task: Написати Unit-тести для сервісів.
- [ ] Task: Написати інтеграційні тести.
- [x] Task: Реалізувати пагінацію для списків.

---

## Фронтенд (Frontend)

### Epic 1: Налаштування Проєкту та Базова Архітектура

- [ ] Task: Ініціалізувати React проєкт (Vite + TypeScript).
- [ ] Task: Налаштувати структуру папок (components, pages, api, store, hooks, types).
- [ ] Task: Підключити Firebase Client SDK.
- [ ] Task: Налаштувати Tailwind CSS. ???
- [ ] Task: Налаштувати React Router для навігації.
- [ ] Task: Налаштувати Zustand для глобального стейту.
- [ ] Task: Налаштувати Axios для HTTP запитів.
- [ ] Task: Налаштувати Vitest та базову конфігурацію для тестування.

---

### Epic 2: Автентифікація та Користувачі

- [x] Task: Створити Firebase конфігурацію.
- [x] Task: Реалізувати AuthStore (Zustand).
- [x] Task: Створити LoginForm компонент.
- [x] Task: Створити RegisterForm компонент.
- [x] Task: Створити AuthModal модальне вікно.
- [ ] Task: Реалізувати сторінку профілю користувача (/profile).
- [ ] Task: Реалізувати логаут функціональність.

---

### Epic 3: Головна Сторінка та Навігація

- [ ] Task: Створити Layout компонент (Header, Footer).
- [ ] Task: Створити Header з навігацією та кнопками входу/реєстрації.
- [ ] Task: Створити Footer.
- [ ] Task: Створити HomePage головну сторінку.
- [ ] Task: Реалізувати слайдер для VIP виноробень.
- [ ] Task: Реалізувати секцію популярних вин.

---

### Epic 4: Каталог Виноробень

- [ ] Task: Створити API сервіс wineryApi.ts.
- [ ] Task: Створити WineryCard компонент.
- [ ] Task: Створити WineryList компонент.
- [ ] Task: Створити WineryFilter компонент (фільтри по країні, регіону).
- [ ] Task: Створити WineryPage сторінку (/wineries).
- [ ] Task: Створити WineryDetailPage сторінку (/wineries/:id).

---

### Epic 5: Каталог Вина

- [ ] Task: Створити API сервіс wineApi.ts.
- [ ] Task: Створити WineCard компонент.
- [ ] Task: Створити WineList компонент.
- [ ] Task: Створити WineFilter компонент (фільтри по кольору, солодкості, ціні).
- [ ] Task: Створити WinePage сторінку (/wines).
- [ ] Task: Створити WineDetailPage сторінку (/wines/:id).
- [ ] Task: Реалізувати додавання вина до улюблених.

---

### Epic 6: Відгуки

- [ ] Task: Створити API сервіс reviewApi.ts.
- [ ] Task: Створити ReviewList компонент.
- [ ] Task: Створити ReviewForm компонент.
- [ ] Task: Реалізувати відображення відгуків на сторінці вина.
- [ ] Task: Реалізувати додавання/редагування/видалення відгуків.

---

### Epic 7: Сорти Винограду

- [ ] Task: Створити API сервіс grapeApi.ts.
- [ ] Task: Створити GrapePage сторінку (/grapes).
- [ ] Task: Реалізувати пошук сортів винограду.

---

### Epic 8: Локації

- [ ] Task: Створити API сервіс locationApi.ts.
- [ ] Task: Реалізувати випадаючі списки країн та регіонів.

---

### Epic 9: Винні Тури

- [ ] Task: Створити API сервіс tourApi.ts.
- [ ] Task: Створити TourCard компонент.
- [ ] Task: Створити TourList компонент.
- [ ] Task: Створити TourPage сторінку (/tours).
- [ ] Task: Створити TourDetailPage сторінку (/tours/:id).

---

### Epic 10: Регіони

- [ ] Task: Створити API сервіс regionApi.ts.
- [ ] Task: Створити RegionPage сторінку (/regions/:name).
- [ ] Task: Реалізувати відображення детальної інформації про регіон.

---

### Epic 11: ШІ-помічник

- [x] Task: Створити API сервіс aiApi.ts.
- [x] Task: Створити AIAssistant компонент.
- [ ] Task: Інтегрувати AI Assistant в UI (кнопка відкриття чату).
- [ ] Task: Реалізувати історію повідомлень.
- [ ] Task: Додати індикатор завантаження.

---

### Epic 12: Улюблені Вина

- [ ] Task: Реалізувати сторінку улюблених вин (/favorites).
- [ ] Task: Додати функціонал швидкого додавання до улюблених.

---

### Epic 13: Деплой та Якість

- [ ] Task: Налаштувати змінні середовища (.env).
- [ ] Task: Налаштувати CI/CD для фронтенду.
- [ ] Task: Написати Unit-тести для компонентів.
- [ ] Task: Написати інтеграційні тести.
- [ ] Task: Оптимізувати бандл (code splitting, lazy loading).

------------------------------------------------------------------------

## Виконавці (Бекенд)

| Epic | Виконавець | Статус |
|------|------------|--------|
| Epic 1-3 | Андрій Веремій | ✅ Готово |
| Epic 4 | Ігор Дикій | ✅ Готово |
| Epic 5 | Андрій Веремій | ✅ Готово |
| Epic 6 | Андрій Попов | ✅ Готово |
| Epic 7 | Владислав Мазуркевич | ✅ Готово |
| Epic 8 | - | ⏳ В роботі |
| Epic 9 | Андрій Веремій | ✅ Готово |
| Epic 10 | - | ⏳ В роботі |

---

## Виконавці (Фронтенд)

| Epic | Виконавець | Статус |
|------|------------|--------|
| Epic 1 | - | ⏳ В роботі |
| Epic 2 | - | ⏳ В роботі |
| Epic 3 | - | ⏳ В роботі |
| Epic 4 | - | ⏳ В роботі |
| Epic 5 | - | ⏳ В роботі |
| Epic 6 | - | ⏳ В роботі |
| Epic 7 | - | ⏳ В роботі |
| Epic 8 | - | ⏳ В роботі |
| Epic 9 | - | ⏳ В роботі |
| Epic 10 | - | ⏳ В роботі |
| Epic 11 | - | ⏳ В роботі |
| Epic 12 | - | ⏳ В роботі |
| Epic 13 | - | ⏳ В роботі |
