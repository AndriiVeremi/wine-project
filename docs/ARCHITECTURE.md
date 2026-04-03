# Архітектура проєкту

Документ описує загальну архітектуру Wine Project та ключові технічні рішення.

---

## Огляд архітектури

Wine Project побудований за архітектурою **клієнт-сервер**. Система спроєктована з урахуванням модульності та масштабованості.

```mermaid
graph LR
    Client([Frontend<br/>React 19 / Vite]) <-->|HTTPS / REST API| Server([Backend<br/>Node.js / Express])
    Server <-->|Mongoose| DB[(MongoDB Atlas)]
    Server -->|Admin SDK| Auth{Firebase Auth}
    Server -->|Uploads| Storage{Firebase Storage}
    Server <-->|Function Calling| AI{Google Gemini AI}
    
    subgraph Deployment
        Client -.-> Vercel
        Server -.-> Render
    end
```

---

## Frontend

### Технології
| Технологія | Призначення |
|------------|-------------|
| **React 19** | UI-фреймворк |
| **Vite** | Збірка та dev-сервер |
| **TypeScript** | Типізація |
| **React Router** | Маршрутизація |
| **TanStack Query** | Серверний стейт, кешування, синхронізація |
| **Zustand** | Клієнтський UI-стейт (фільтри, авторизація) |
| **React Hook Form** | Керування формами та валідація |
| **Zod** | Схеми валідації даних |
| **styled-components** | Стилізація |
| **Firebase SDK** | Автентифікація |
| **Axios** | HTTP-клієнт з кешуванням токенів |
| **Leaflet** | Мапи |
| **Tiptap** | Rich Text Editor |

### Структура
```text
frontend/src/
├── api/              # API-клієнти (Axios інстанс та ендпоінти)
├── components/       # React-компоненти
│   ├── common/       # Перевикористовувані (Skeleton, FormField тощо)
│   ├── forms/        # Форми на базі React Hook Form
│   ├── layout/       # Шаблон (Header, Footer)
│   └── .../          # Доменні компоненти (Wine, Winery, Tour)
├── constants/        # Константи, Query Keys, дані мапи
├── hooks/            # Кастомні хуки
├── pages/            # Сторінки додатку
├── store/            # Zustand сторі (Client-side state)
├── types/            # TypeScript типи (уніфіковані, DRY)
└── utils/            # Утиліти (форматування, обробка помилок)
```

---

## Backend

### Технології
| Технологія | Призначення |
|------------|-------------|
| **Node.js** | Runtime |
| **Express** | HTTP-сервер |
| **TypeScript** | Типізація |
| **Mongoose** | ODM для MongoDB |
| **Firebase Admin** | Серверна автентифікація |
| **Joi** | Валідація |
| **Helmet** | Безпечні заголовки |
| **express-rate-limit** | Rate limiting |
| **Swagger** | API-документація |
| **Google Gemini AI** | AI-помічник |
| **sanitize-html** | Очищення HTML (XSS захист) |

### Структура
Бекенд використовує **Service Repository Pattern**, де контролери відповідають лише за HTTP-відповіді, а бізнес-логіка винесена у сервіси у вигляді чистих асинхронних функцій.

```text
backend/src/
├── config/           # Swagger та AI конфіг
├── controllers/      # Обробники HTTP запитів
├── data/             # Сид-дані
├── middleware/       # Авторизація, завантаження файлів (Multer)
├── models/           # Mongoose моделі
├── routes/           # Маршрути (Express Router)
├── schemas/          # Joi-схеми
├── services/         # Бізнес-логіка (Функціональний підхід)
└── index.ts          # Точка входу
```

---

## Потік даних

### Автентифікація (Firebase + Custom JWT logic)
Процес авторизації побудований на перехопленні запитів (Interceptors) для гарантії актуальності токена без необхідності зберігати його в LocalStorage.

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Firebase
    participant Backend
    
    User->>Frontend: Вводить логін/пароль
    Frontend->>Firebase: Авторизація (Client SDK)
    Firebase-->>Frontend: Повертає сесію
    Frontend->>Firebase: user.getIdToken() перед запитом
    Firebase-->>Frontend: Актуальний Bearer Token
    Frontend->>Backend: Запит до API + Authorization Header
    Backend->>Firebase: auth().verifyIdToken() (Admin SDK)
    Firebase-->>Backend: Розшифрований об'єкт користувача
    Backend-->>Frontend: Захищені дані
```

---

## AI-помічник (Сомельє)

### Архітектура
AI-Сомельє використовує технологію **Function Calling**. Модель не просто генерує текст, а має доступ до інструментів бази даних (пошук вин, виноробень, турів), що робить її відповіді на 100% прив'язаними до реального асортименту. 
Ліміт токенів контролюється через змінну середовища `GEMINI_MAX_OUTPUT_TOKENS`.

```mermaid
sequenceDiagram
    participant User
    participant Backend
    participant Gemini
    participant DB as MongoDB
    
    User->>Backend: Питання (напр. "Порадь сухе червоне з Грузії")
    Backend->>Gemini: Передача контексту + доступні функції
    Gemini-->>Backend: Виклик функції: searchWines(color: red, sweetness: dry)
    Backend->>DB: Запит до бази даних
    DB-->>Backend: Результат (список вин)
    Backend->>Gemini: Повернення результату функції
    Gemini-->>Backend: Формування красивої відповіді для користувача
    Backend-->>User: Текстова відповідь + пропозиції
```

---

## Безпека

### Захист на бекенді
| Механізм | Опис |
|----------|------|
| **Helmet** | HTTP-заголовки безпеки (Content-Security-Policy тощо) |
| **CORS** | Динамічний білий список дозволених доменів |
| **Rate Limiting** | 1000 запитів/15 хв (захист від DDoS) |
| **Input Validation** | Joi schemas + Mongoose validation |
| **HTML Sanitization** | Очищення описів вин/вінерій від XSS скриптів |

### Рольова модель (RBAC)
| Роль | Права |
|------|-------|
| `USER` | Читання, створення відгуків, додавання в улюблені |
| `WINERY_OWNER` | + Створення та управління власною виноробнею, винами, турами |
| `ADMIN` | + Видалення користувачів, видалення будь-яких відгуків, надання VIP-статусу |

---

## CI/CD

### Потік розгортання
```mermaid
graph TD
    A[Push / PR to Main] --> B{GitHub Actions}
    B --> C[ESLint & Prettier]
    B --> D[Jest / Vitest]
    C --> E[Build]
    D --> E
    E --> F[Vercel Deploy]
    E --> G[Docker Build & Push]
    G --> H[Render Deploy]
```
