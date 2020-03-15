Вернуться на [главную](README.md)

## Содержание

- [Описание домашки по NodeJS](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [TODO](#todo)
- [Authors](#authors)

## Описание домашки по NodeJS <a name = "about"></a>

Версия Node JS - 11.6.0

Реализовал простое API c командами
- GET /api/settings — получение сохраненных настроек
- POST /api/settings - cохранение настроек
- GET  /api/builds - получение списка сборок
- POST /api/builds/:commitHash - добавление сборки в очередь
- GET  /api/builds/:buildId - получение информации о конкретной сборке
- GET  /api/builds/:buildId/logs - получение логов билда (сплошной текст)

## Начало работы <a name = "getting_started"></a>

Для запуска приложения необходимо:
- Зайти в папку [src](src)
- Создать там файл `.env` с прописанным там вашим ключом авторизации к API с базой данных (аналогично файлу [.env.simple](src/.env.simple))
- Запустить сервер из консоли
```CLI
node app.js
```

Вернуться на [главную](README.md)
