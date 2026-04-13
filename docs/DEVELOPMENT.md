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
- **Framework:** React 19
- **Build Tool:** Vite
- **Language:** TypeScript
- **State Management:** TanStack Query (серверний стейт), Zustand (клієнтський стейт)
- **Forms:** React Hook Form + Zod
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

### 5. Призначення ролі Адміна (Development)

Оскільки проект використовує захищену систему ролей через Firebase Custom Claims, зміна поля в базі даних MongoDB **не дасть** повного доступу адміна. Для цього потрібно оновити "цифровий підпис" користувача.

Для розробки створено спеціальний скрипт. Запустіть його всередині Docker-контейнера:

```bash
# Дізнайтеся свій Firebase UID у консолі Firebase (Auth -> Users)
docker exec -it backend npx ts-node set-admin.ts ВАШ_FIREBASE_UID
```

Після успішного виконання обов'язково **вийдіть та знову зайдіть** у свій акаунт на сайті, щоб отримати оновлений токен.

### 6. Зупинка

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
├── api/             # Ендпоінти API (Axios інстанс)
├── assets/          # Статичні файли
├── components/      # React-компоненти
│   ├── common/      # Спільні (Skeleton, FormField)
│   ├── forms/       # Форми (React Hook Form)
│   └── .../         # Доменні блоки (Wine, Winery)
├── constants/       # Query Keys, дані мапи, константи
├── hooks/           # Кастомні хуки
│   ├── queries/     # TanStack Query хуки
│   └── .../         # Утилітарні хуки
├── pages/           # Сторінки
├── store/           # Zustand сторі (Client UI State)
├── types/           # TypeScript типи (уніфіковані)
└── utils/           # Форматування, тости, допомога
```


## 🎨 Стиль коду

Проєкт використовує **ESLint** та **Prettier** для підтримки єдиного стилю коду.
*   **Перед кожним комітом** обов'язково виконайте наступні команди у відповідній папці (`frontend` або `backend`):
    1.  Запустіть `npm run format` для автоматичного форматування коду.
    2.  Запустіть `npm run lint` для перевірки коду на наявність помилок та відповідність стилю.
*   Переконайтесь, що всі помилки форматування та лінтера виправлені перед створенням коміту.

## 🤝 Контакти та внесок

Проєкт розроблений командою під керівництвом **Andrii Veremii**. З питань архітектури або розгортання звертайтеся до відповідних учасників команди (контакти в [README.md](../README.md)).

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

### Налаштування (Environment Variables)

Для стабільної та безпечної роботи ШІ-помічника необхідно налаштувати наступні змінні у файлі `.env` (папка `backend`):

| Змінна | Опис | Рекомендоване значення |
| :--- | :--- | :--- |
| `AI_ASSISTANT_ENABLED` | Головний перемикач ШІ. Якщо `false`, всі запити до ШІ будуть заблоковані. | `true` |
| `GEMINI_API_KEY` | Ваш секретний ключ від Google AI Studio або Google Cloud Console. | `AIzaSy...` |
| `GEMINI_MAX_OUTPUT_TOKENS` | Максимальна довжина відповіді ШІ (в токенах). Обмежує витрати та довжину повідомлень. | `2000` |
| `AI_MAX_FUNCTION_CALLS` | **Захист від циклів.** Максимальна кількість звернень ШІ до вашої бази даних за один запит користувача. | `5` |
| `AI_RATE_LIMIT_WINDOW_MS` | Часове вікно для обмеження кількості запитів до ШІ (в мілісекундах). | `3600000` (1 год) |
| `AI_RATE_LIMIT_MAX_REQUESTS` | Максимальна кількість повідомлень ШІ, яку може надіслати один користувач за вказане вікно часу. | `15` |

А також змінна для фронтенду (`frontend/.env`):
*   `VITE_AI_ASSISTANT_ENABLED=true` — керує відображенням іконки чату в інтерфейсі.

Якщо `AI_ASSISTANT_ENABLED` встановлено в `false`, ендпоінт `/api/ai/chat` повертатиме помилку `503 Service Unavailable`. При перевищенні лімітів запитів користувач отримає помилку `429 Too Many Requests`.

---

## 🛡️ Безпека та Ліміти запитів (Rate Limiting)

Проєкт використовує дворівневу систему захисту від надмірних запитів:

1.  **Загальний ліміт API:** Контролюється змінними `RATE_LIMIT_WINDOW_MS` та `RATE_LIMIT_MAX_REQUESTS`. Захищає весь сервер від DDoS атак та перевантаження.
2.  **Спеціальний ліміт для ШІ:** Контролюється змінними `AI_RATE_LIMIT_...`. Оскільки кожен запит до ШІ коштує грошей, цей ліміт набагато суворіший (за замовчуванням 15 запитів на годину).

Детальні налаштування Content Security Policy та захисту даних дивіться у [SECURITY.md](./SECURITY.md).

### CORS
Налаштовується через змінну `CORS_ORIGIN` в `.env`:
```env
CORS_ORIGIN=http://localhost:5173
```

Для продакшену вказуйте повний домен:
```env
CORS_ORIGIN=https://wine-project.com
```
