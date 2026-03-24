# Архітектура проєкту

Документ описує загальну архітектуру Wine Project та ключові технічні рішення.

---

## Огляд архітектури

Wine Project побудований за архітектурою **клієнт-сервер**. Система спроєктована з урахуванням модульності та масштабованості.

```
┌─────────────────┐     HTTPS      ┌─────────────────┐     MongoDB     ┌─────────────────┐
│    Frontend     │◄──────────────►│    Backend      │◄──────────────►и│    MongoDB      │
│    (React)      │   REST API     │    (Express)    │                 │    Atlas        │
└─────────────────┘                └─────────────────┘                 └─────────────────┘
        │                                   │
        │                                   ├── Firebase Auth
        │                                   ├── Firebase Storage
        │                                   ├── Google Gemini AI
        │                                   └── Render 
        │
        └── Vercel 
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
| **React Query** | Серверний стейт, кешування |
| **Zustand** | Клієнтський стейт |
| **styled-components** | Стилізація |
| **Firebase SDK** | Автентифікація |
| **Axios** | HTTP-клієнт |
| **Leaflet** | Мапи |
| **Tiptap** | Rich Text Editor |

### Структура
```
frontend/src/
├── api/              # API-клієнти
├── components/       # React-компоненти
│   ├── common/       # Перевикористовувані
│   ├── forms/        # Форми
│   ├── layout/       # Шаблон (Header, Footer)
│   └── .../          # Доменні компоненти
├── config/           # Firebase конфіг
├── hooks/            # Кастомні хуки
├── pages/            # Сторінки
├── store/            # Zustand сторі
├── types/            # TypeScript типи
├── constants/        # Константи
└── tests/            # Тести
```

### Маршрутизація
| Маршрут | Сторінка |
|---------|----------|
| `/` | HomePage |
| `/wines` | WinesPage |
| `/wines/:id` | WineDetailPage |
| `/wineries` | WineriesPage |
| `/wineries/:id` | WineryDetailPage |
| `/tours` | WineToursPage |
| `/tours/:id` | WineTourDetailPage |
| `/grapes` | GrapesPage |
| `/grapes/:id` | GrapeDetailPage |
| `/regions/:id` | RegionDetailPage |
| `/about` | AboutPage |
| `/account` | AccountPage |

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
```
backend/src/
├── config/           # Swagger конфіг
├── controllers/      # Обробники запитів
├── data/            # Сид-дані
├── middleware/      # Проміжне ПЗ
├── models/          # Mongoose моделі
├── routes/          # Маршрути
├── schemas/        # Joi-схеми
├── services/       # Бізнес-логіка
├── types/          # TypeScript типи
├── utils/          # Утиліти
└── index.ts        # Точка входу
```

### API ендпоінти
| Префікс | Ресурс |
|---------|--------|
| `/api/users` | Користувачі |
| `/api/wines` | Вина |
| `/api/wineries` | Виноробні |
| `/api/grapes` | Сорти винограду |
| `/api/locations` | Локації |
| `/api/regions` | Регіони |
| `/api/tours` | Тури |
| `/api/reviews` | Відгуки |
| `/api/ai` | AI-Сомільє |
| `/api/admin/reviews` | Адмін: відгуки |

---

## Потік даних

### Автентифікація
```
1. Користувач вводить email/password на фронтенді
2. Firebase Auth створює токен
3. Токен зберігається у Firebase SDK
4. При API-запитах токен відправляється в заголовку
5. Backend перевіряє токен через Firebase Admin SDK
6. Firebase Admin повертає decoded token з UID
```

### Запит на створення вина
```
Frontend                    Backend                     Database
   │                           │                            │
   ├── POST /api/wines ───────►│                            │
   │  Headers: Authorization   │                            │
   │                           ├── Валідація Joi            │
   │                           ├── Перевірка auth middleware│
   │                           ├── wineService.create()     │
   │                           │                            │
   │                           │──► Wine.create() ─────────►│
   │                           │◄──── Wine saved ───────────│
   │◄── 201 Created ──────────┤                             │
   │◄── { wine: {...} } ──────┤                             │
```

---

## Зберігання файлів

### Firebase Storage
Використовується для:
- Логотипи виноробень
- Зображення вин
- Галереї виноробень
- Аватари користувачів

### Потік завантаження
```
1. Файл вибирається на фронтенді
2. Завантаження напряму в Firebase Storage
3. Отримання URL завантаженого файлу
4. URL зберігається в MongoDB
```

---

## AI-помічник (Сомельє)

### Архітектура
```
User Message ──► Backend ──► Google Gemini AI
                    │               │
                    │◄── Response ◄─┤
                    │               │
                    ├── Tool Calls  │
                    │  (Function    │
                    │   Calling)    │
                    │               │
                    └──► Database ──┘
```

### Доступні інструменти
| Функція | Опис |
|---------|------|
| `searchWines` | Пошук вин за критеріями |
| `getRegionInfo` | Інформація про регіон |
| `getWineryInfo` | Інформація про виноробню |
| `searchTours` | Пошук турів |
| `getMyFavoriteWines` | Улюблені вина користувача |

---

## Безпека

Детальний опис механізмів безпеки та налаштувань CSP дивіться у [SECURITY.md](./SECURITY.md).

### Захист на бекенді
| Механізм | Опис |
|----------|------|
| **Helmet** | HTTP-заголовки безпеки |
| **CORS** | Дозволені origins |
| **Rate Limiting** | 100 запитів/15 хв |
| **JWT Validation** | Firebase tokens |
| **Input Validation** | Joi schemas |
| **HTML Sanitization** | Очищення HTML від XSS |
| **RBAC** | Рольовий доступ |

### Ролі та права
| Роль | Права |
|------|-------|
| `USER` | Читання, створення відгуків, улюблені |
| `WINERY_OWNER` | + Управління своєю виноробнею, винами, турами |
| `ADMIN` | + Управління відгуками, VIP-статус |

---

## CI/CD

### GitHub Actions
```
Push/PR ──► Lint ──► Test ──► Build ──► Deploy
              │        │        │
              ▼        ▼        ▼
           ESLint   Vitest   Vercel
           Prettier  Jest    (Frontend)
                               │
                               └──► Docker
                                   (Backend)
```

### Середовища
| Середовище | Фронтенд | Бекенд |
|------------|----------|--------|
| Development | localhost:5173 | localhost:5005 |
| Production | Vercel | Docker |
