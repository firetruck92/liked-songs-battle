# Liked Songs Battle

Турнир из твоих лайкнутых треков в Spotify: из каждой пары оставляешь один трек, пока не останется самый любимый.

**Сайт:** https://firetruck92.github.io/liked-songs-battle/

## Возможности

- Вход через Spotify (только чтение лайков, scope `user-library-read`). Также можно загрузить один или несколько CSV-файлов из [Exportify](https://exportify.app) или `YourLibrary.json` из экспорта данных Spotify, либо вставить список строками.
- Обложки альбомов и короткие отрывки треков через встроенный плеер Spotify.
- В турнир можно взять все треки, последние лайкнутые или случайную выборку. Если число треков не степень двойки, сначала идёт отборочный раунд.
- Отмена хода; прогресс сохраняется в браузере.
- В конце — итоговая таблица и картинка с результатом (PNG 1080×1350), которой можно поделиться.
- Управление с клавиатуры: `←` / `→` — выбрать, `↓` — случайно, `Z` — отменить.

## Настройка входа через Spotify

1. Открой [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard) → **Create app**.
2. В **Redirect URIs** добавь адрес, где открыт сайт:
   - `https://firetruck92.github.io/liked-songs-battle/`
   - для локального запуска: `http://127.0.0.1:8000/`
3. Отметь **Web API**, сохрани и вставь **Client ID** на сайте.

Чтобы вход был сразу одной кнопкой для всех, впиши свой Client ID в `DEFAULT_CLIENT_ID` в `src/template.html` и пересобери (`python build.py`).
Пока приложение Spotify в режиме разработки, войти смогут только пользователи, которых ты добавишь в **User Management** приложения.

Всё работает в браузере: токены и списки треков хранятся только в `localStorage`, никакого сервера нет.

## Локальный запуск

```
python -m http.server 8000 --bind 127.0.0.1
```

и открой http://127.0.0.1:8000/

## Структура

- `src/template.html` — разметка, стили и интерфейс
- `src/auth.js` — вход через Spotify (OAuth PKCE) и запросы к API
- `src/core.js` — логика турнира
- `build.py` — собирает `index.html` (сайт) и `dist/claude-artifact.html` (версия для Claude-артефакта без входа через Spotify)

После правок в `src/` запусти `python build.py`.

## Деплой

Сайт собирается и публикуется через GitHub Actions (`.github/workflows/pages.yml`) при каждом пуше в `main`: workflow запускает `build.py` и выкладывает `index.html` на GitHub Pages. Один раз нужно включить в **Settings → Pages → Source: GitHub Actions**.
