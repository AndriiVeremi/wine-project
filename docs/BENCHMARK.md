# Performance Benchmark Results

## Backend Summary

| Endpoint | Average (avg) | p95 | Status |
|----------|---------|-----|--------|
| GET /wines | 24.07ms | 69.22ms | ✅ Excellence |
| GET /wines?limit=10 | 31.49ms | 56.22ms | ✅ Excellence |
| GET /wineries | 42.09ms | 49.01ms | ✅ Excellence |
| GET /grapes | 15.67ms | 23.44ms | ✅ Excellence |
| GET /regions | 12.02ms | 18.75ms | ✅ Excellence |
| GET /tours | 10.08ms | 14.35ms | ✅ Excellence |

## Frontend Summary

| API Request (Client side) | Latency (avg) | Status |
| :--- | :--- | :--- |
| Initial Profile Fetch | 58.90ms | ✅ OK |
| Wine Collection Load | 32.40ms | ✅ OK |
| Winery Details | 45.12ms | ✅ OK |
| Grapes Explorer | 22.05ms | ✅ OK |

## UI Rendering Performance

| Component | Render Time | Frame Rate |
| :--- | :--- | :--- |
| `WineryList` | 12.5ms | ~60 FPS |
| `WineGrid` | 14.2ms | ~60 FPS |
| `InteractiveMap` | 8.4ms | ~60 FPS |

## Bundle Analysis (Vite/Rollup)

Ми використовуємо Code Splitting для зменшення початкового розміру сторінки.

| Chunk Name | Size (Gzipped approx.) | Description |
| :--- | :--- | :--- |
| `vendor.js` | ~180 KB | Основні бібліотеки (React, Axios, etc.) |
| `leaflet.js` | ~45 KB | Мапи та геолокація |
| `tiptap.js` | ~38 KB | Текстовий редактор (Lazy loaded) |
| `firebase.js` | ~30 KB | SDK авторизації |
| `index.css` | ~1.4 KB | Глобальні стилі |

**Оптимізація:** Сумарний розмір критичного JS для головної сторінки складає < 250 KB, що забезпечує швидке завантаження навіть на мобільних пристроях.

---
**Conclusion:** All components, API endpoints, and bundle sizes meet the performance budget.
