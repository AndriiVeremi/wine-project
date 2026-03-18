# Інструкція для розробників

Цей документ містить всю необхідну інформацію для розробки та запуску проєкту.

## 🛠 Технологічний стек (Stack)

Проєкт побудований на сучасних технологіях для забезпечення швидкості та безпеки:

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB (через Mongoose)
- **Security/Auth:** Firebase Admin SDK (JWT, RBAC)
- **File Storage:** Firebase Storage (для зображень та логотипів)
- **Validation:** Joi
- **Testing:** Jest
- **Documentation:** Swagger (OpenAPI 3.0)
- **AI Integration:** Google Generative AI (Gemini API)

### Frontend
- **Framework:** React
- **Build Tool:** Vite
- **Language:** TypeScript
- **State Management:** Zustand, React Query
- **Styling:** Styled Components
- **Rich Text:** Tiptap
- **Maps:** Leaflet
- **Auth:** Firebase SDK
- **Icons:** Lucide React, React Icons

---

## ⚙️ Системні вимоги

*   [Node.js](https://nodejs.org/) (рекомендована LTS-версія)
*   [Docker Desktop](https://www.docker.com/products/docker-desktop/) (має бути запущений)
*   [Git](https://git-scm.com/)

## 🚀 Запуск проєкту

### 1. Клонування репозиторію

```bash
git clone https://github.com/AndriiVeremi/wine-project
cd wine-project
```

### 2. Налаштування змінних оточення

**Фронтенд:**
1.  У папці `frontend` створіть копію файлу `.env.example` та назвіть її `.env`.
2.  Заповніть `VITE_FIREBASE_CONFIG` даними з вашого Firebase проєкту.

**Бекенд:**
1.  У папці `backend` створіть копію файлу `.env.example` та назвіть її `.env`.
2.  Встановіть `MONGO_URI=mongodb://mongodb:27017/wine-db`.
3.  Додайте `FIREBASE_SERVICE_ACCOUNT_CREDS_JSON`. Це JSON-об'єкт з обліковими даними сервісного акаунту Firebase. Його необхідно для створення користувачів та призначення ролей на бекенді.
4.  Налаштуйте `CORS_ORIGIN` - домен фронтенду для CORS (за замовчуванням `http://localhost:5173`).

### 3. Запуск

Проєкт складається з двох частин, які потрібно запускати паралельно.

**Бекенд (Docker):**
У папці `backend` виконайте:
```bash
docker compose -f docker-compose.dev.yml up --build
```
*Бекенд буде доступний на `http://localhost:5005`.*

**Фронтенд:**
У папці `frontend` виконайте:
```bash
# Встановлення залежностей (одноразово)
npm install

# Запуск сервера розробки
npm run dev
```
*Фронтенд буде доступний на `http://localhost:5173` (або за адресою, вказаною Vite).*

### 4. Наповнення бази даних (Seeding)

Для тестування та розробки необхідно наповнити базу даних початковими даними.

1.  **Переконайтесь, що Docker-контейнери бекенду та бази даних запущено.**
    ```bash
    # У папці backend/
    docker compose -f docker-compose.dev.yml up -d
    ```

2.  **Завантажте дані:**
    Ця команда видалить старі дані та завантажить нові з файлу `backend/src/data/seedData.ts`. Вона виконується всередині Docker-контейнера бекенду.
    ```bash
    # У папці backend/
    docker compose -f docker-compose.dev.yml run --rm backend npm run db:seed
    ```
3.  **Видаліть дані:**
    Ця команда повністю очистить відповідні колекції в базі даних. Вона також виконується всередині Docker-контейнера бекенду.
    ```bash
    # У папці backend/
    docker compose -f docker-compose.dev.yml run --rm backend npm run db:destroy
    ```

### 5. Зупинка

*   **Бекенд:** `docker compose -f docker-compose.dev.yml down` у папці `backend`.
*   **Фронтенд:** `Ctrl + C` у відповідному терміналі.


## 🗂️ Структура проєкту

### Backend
```
backend/src/
├── controllers/     # Обробники запитів
├── data/            # Фіктивні дані DB
├── middleware/      # Middleware-функції
├── models/          # Моделі Mongoose
├── routes/          # Маршрути
├── schemas/         # Joi схеми валідації даних
├── services/        # Бізнес-логіка
├── types/           # TypeScript типи
└── index.ts         # Головний файл сервера

backend/tests/
├── __tests__/       # Unit-тести
└── __mocks__/       # Mоки (Firebase, MongoDB)
```

### Frontend
```
frontend/src/
├── api/             # Взаємодія з API
├── assets/          # Статичні файли (зображення, іконки)
├── components/      # React-компоненти
│   ├── common/      # Загальні компоненти
│   ├── forms/       # Компоненти форм
│   ├── layout/      # Компоненти розмітки (header, footer)
│   └── modals/      # Модальні вікна
├── config/          # Конфігурація (Firebase)
├── hooks/           # Кастомні хуки
├── pages/           # Компоненти сторінок
├── store/           # Глобальний стейт (Zustand)
├── styles/          # Глобальні стилі
├── tests/           # Тести
├── types/           # TypeScript типи
├── App.css          # Стилі основного компонента
├── App.tsx          # Основний компонент застосунку
├── index.css        # Глобальні стилі
└── main.tsx         # Точка входу застосунку
```


## 🎨 Стиль коду

Проєкт використовує **ESLint** та **Prettier** для підтримки єдиного стилю коду.
*   **Перед кожним комітом** обов'язково виконайте наступні команди у відповідній папці (`frontend` або `backend`):
    1.  Запустіть `npm run format` для автоматичного форматування коду.
    2.  Запустіть `npm run lint` для перевірки коду на наявність помилок та відповідність стилю.
*   Переконайтесь, що всі помилки форматування та лінтера виправлені перед створенням коміту.

## 🤝 Внесок у проєкт

### Git Workflow
1.  **Створення гілки**: Створюйте нову гілку з `develop` для кожної нової задачі.
    ```bash
    git checkout develop
    git pull origin develop
    git checkout -b feature/назва-задачі
    ```
2.  **Робота над задачею**: Робіть коміти з чіткими повідомленнями.
3.  **Створення Pull Request (PR)**:
    *   Оновіть свою гілку відносно `develop`, щоб уникнути конфліктів.
        ```bash
        git checkout develop
        git pull origin develop
        git checkout feature/назва-задачі
        git rebase develop
        ```
    *   Запуште гілку на GitHub: `git push origin feature/назва-задачі`
    *   Створіть PR з `feature/назва-задачі` в `develop`.
    *   Додайте детальний опис змін та пов'яжіть PR з відповідним Issue.

## 🧪 Тестування

Для забезпечення якості коду проєкт використовує **Jest** для бекенду та **Vitest** для фронтенду.

### Запуск тестів

**Бекенд (Jest):**
```bash
cd backend
npm test              # запустити всі тести
npm run test:watch    # запустити з автоперезагрузкою
npm run test:coverage # показати покриття коду
```

**Фронтенд (Vitest):**
```bash
cd frontend
npm test              # запустити всі тести
npm run test:watch    # запустити з автоперезагрузкою
npm run test:coverage # показати покриття коду
npm run test:ui       # запустити з UI інтерфейсом
```

### Структура тестів

Тести зберігаються в папці `tests/`:
```
backend/tests/
├── __tests__/              # Unit-тести
│   └── userService.test.ts
├── __mocks__/              # Mоки (Firebase, MongoDB)
│   └── firebase.ts
└── ...

frontend/tests/              # Unit-тести
```

### Як писати тести

1. **Сервіси (backend):** Тестуємо бізнес-логіку через моки моделей Mongoose.
2. **Контролери:** Тестуємо через моки сервісів.
3. **Middleware:** Тестуємо окремо, мокаємо залежності.

Приклад тесту сервісу:
```typescript
import * as userService from '@/services/userService';

jest.mock('@/models/userModel', () => ({ ... }));

describe('userService', () => {
  it('should throw error if user not found', async () => {
    // Тест
  });
});
```

### Правила

*   Новий функціонал має бути покритий тестами.
*   Тестуйте критично важливі шляхи (critical paths).
*   Мінімальне покриття коду тестами: **30%**.
*   Назви тестів мають бути описовими та зрозумілими.

---

## 🤖 ШІ-помічник

Проєкт включає інтерактивного ШІ-помічника, який виконує роль віртуального сомельє. Цей розділ описує його архітектуру та налаштування.

### Архітектура ШІ

-   **Технологія:** Google Generative AI (модель `gemini-2.5-flash`).
-   **Function Calling:** ШІ інтегрований з базою даних через інструменти (Tools). Він може самостійно викликати функції для:
    -   Пошуку вин за критеріями (`searchWines`).
    -   Отримання інформації про регіони (`getRegionInfo`).
    -   Отримання даних про виноробні (`getWineryInfo`).
    -   Пошуку винних турів (`searchTours`).
    -   Аналізу вподобань користувача (`getMyFavoriteWines`).
-   **Системний промпт:** Налаштований на роль професійного сомельє та гіда.
-   **Доступ:** Лише для автентифікованих користувачів.

### Налаштування

Для роботи ШІ-помічника необхідно додати наступні змінні до файлів `.env` у папці `backend` та `frontend`:

```env backend
# Ключ доступу до Google Generative AI API
GEMINI_API_KEY=AIzaSy...
# Ввімкнення/вимкнення функціоналу ШІ-помічника ('true' або 'false')
AI_ASSISTANT_ENABLED=true
```
а також додати наступну змінну до файлу `.env` у папці `frontend`:

```env frontend
# Ввімкнення/вимкнення функціоналу ШІ-помічника ('true' або 'false')
VITE_AI_ASSISTANT_ENABLED=true
`
Якщо `AI_ASSISTANT_ENABLED` встановлено в `false`, ендпоінт `/api/ai/chat` повертатиме помилку `503 Service Unavailable`.

---

## 🛡️ Безпека

Проєкт включает наступні засоби захисту:

### Helmet
Автоматично додає безпечні HTTP-заголовки:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- та інші

Підключається автоматично в `backend/src/index.ts`.

### Rate Limiting
Обмежує кількість запитів з одної IP-адреси:
- **Ліміт:** 100 запитів за 15 хвилин
- **При перевищенні:** повертає `429 Too Many Requests`

### CORS
Налаштовується через змінну `CORS_ORIGIN` в `.env`:
```env
CORS_ORIGIN=http://localhost:5173
```

Для продакшену вказуйте повний домен:
```env
CORS_ORIGIN=https://wine-project.com
```
