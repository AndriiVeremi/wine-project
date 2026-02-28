# 🌍 Деплой інструкція

## План деплою

| Сервіс | Призначення | Посилання |
|--------|-------------|-----------|
| Vercel | Frontend | vercel.com |
| Render | Backend | render.com |
| MongoDB Atlas | Database | mongodb.com/atlas |
| Firebase | Auth | console.firebase.google.com |

---

## Крок 1: MongoDB Atlas (База даних)

1. Зареєструйся на [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Створи безкоштовний кластер (Free Tier - M0)
3. Створи користувача бази даних (Database User)
4. Дозволь доступ з будь-якого IP (Network Access → Allow Access from Anywhere)
5. Отримай URI підключення:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/wine-db
   ```
6. Збережи цей URI для наступних кроків

---

## Крок 2: Firebase (Автентифікація)

1. Перейди в [Firebase Console](https://console.firebase.google.com)
2. Обери свій проєкт
3. **Authentication → Settings → Authorized domains**
4. Додай домени:
   - `localhost` (для розробки)
   - Твой Vercel домен (після деплою)
5. **Project Settings → Service Accounts**
6. Створи сервісний акаунт та отримай JSON credentials
7. Скопіюй вміст JSON в змінну `FIREBASE_SERVICE_ACCOUNT_CREDS_JSON`

---

## Крок 3: Render (Backend)

1. Зареєструйся на [Render](https://render.com)
2. Підключи GitHub репозиторій
3. Створи новий **Web Service**:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Додай Environment Variables:

| Variable | Value |
|----------|-------|
| `MONGO_URI` | URI з MongoDB Atlas |
| `FIREBASE_SERVICE_ACCOUNT_CREDS_JSON` | JSON з Firebase |
| `GEMINI_API_KEY` | Ключ з Google AI Studio |
| `AI_ASSISTANT_ENABLED` | `true` |
| `CORS_ORIGIN` | Твой Vercel домен (без https://) |
| `PORT` | `10000` (Render назначить) |

5. Натисни **Deploy**

Після деплою отримаєш URL типу: `https://wine-backend.onrender.com`

---

## Крок 4: Vercel (Frontend)

1. Зареєструйся на [Vercel](https://vercel.com)
2. Імпортуй репозиторій
3. Налаштуй:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
4. Додай Environment Variables:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | URL бекенду на Render |
| `VITE_FIREBASE_CONFIG` | Конфіг з Firebase Console |
| `VITE_AI_ASSISTANT_ENABLED` | `true` |

5. Натисни **Deploy**

---

## Оновлення після змін в коді

### Backend (Render)
Якщо змінив код бекенду:
```bash
git add .
git commit -m "fix: some fix"
git push origin develop
```
Render автоматично передеплоїть (якщо налаштовано).

### Frontend (Vercel)
Vercel автоматично деплоїть при пуші в main/develop.

---

## ⚠️ Важливо

1. **CORS_ORIGIN** на Render має бути твой Vercel домен (без https://)
2. **MongoDB Atlas** - не забудь дозволити доступ з IP Render
3. **Firebase** - додай Vercel домен в Authorized domains

---

## Тестування

Після деплою перевір:
- [ ] API працює: `https://wine-backend.onrender.com/api`
- [ ] Swagger docs: `https://wine-backend.onrender.com/api-docs`
- [ ] Frontend підключається до API
- [ ] Автентифікація працює
