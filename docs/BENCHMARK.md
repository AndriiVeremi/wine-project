# Performance Benchmark Results

## Тестування

```bash
cd backend
npm run dev  # термінал 1

node benchmark.js  # термінал 2
```

## Останні результати (18.03.2026)

```
═══════════════════════════════════════════
        PERFORMANCE BENCHMARK RESULTS
═══════════════════════════════════════════

Date: 18.03.2026, 22:43:30

✓ GET /wines                     avg:   24.07ms | min:  16.22ms | max:  69.22ms | p95:  69.22ms
✓ GET /wines?limit=10            avg:   31.49ms | min:  20.82ms | max:  56.22ms | p95:  56.22ms
✓ GET /wines?sort=price          avg:   20.28ms | min:  16.65ms | max:  32.23ms | p95:  32.23ms
✓ GET /wineries                  avg:   42.09ms | min:  35.11ms | max:  49.01ms | p95:  49.01ms
✓ GET /grapes                    avg:   15.67ms | min:  12.89ms | max:  23.44ms | p95:  23.44ms
✓ GET /regions                   avg:   12.02ms | min:   7.86ms | max:  18.75ms | p95:  18.75ms
✓ GET /tours                     avg:   10.08ms | min:   7.70ms | max:  14.35ms | p95:  14.35ms

───────────────────────────────────────────
  Summary: avg < 200ms = ✓ | avg > 200ms = ⚠
═══════════════════════════════════════════
```

## Аналіз

| Endpoint | Середній | p95 | Оцінка |
|----------|---------|-----|--------|
| GET /wines | 24ms | 69ms | ✅ відмінно |
| GET /wines?limit=10 | 31ms | 56ms | ✅ відмінно |
| GET /wines?sort=price | 20ms | 32ms | ✅ відмінно |
| GET /wineries | 42ms | 49ms | ✅ відмінно |
| GET /grapes | 15ms | 23ms | ✅ відмінно |
| GET /regions | 12ms | 18ms | ✅ відмінно |
| GET /tours | 10ms | 14ms | ✅ відмінно |

**Вимога:** середній час < 200ms
**Результат:** всі endpoint'и < 50ms ✅

## Оптимізації

1. **MongoDB Indexes** - пришвидшують запити
2. **.lean()** - зменшує використання пам'яті
3. **Pagination** - лімітує дані
4. **Fields projection** - тільки потрібні поля

## Файли

- `benchmark.js` - скрипт для тестування (локально)
- `docs/BENCHMARK.md` - документація
