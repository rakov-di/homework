Вернуться на [главную](README.md)

## Содержание

- [Описание домашки по NodeJS](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [TODO](#todo)
- [Authors](#authors)

## Описание домашки по NodeJS <a name = "about"></a>

Версия Node JS - 11.6.0

Реализовал отдачу статических страниц:
 - http://localhost:3000/start-screen.html
 - http://localhost:3000/settings.html
 - http://localhost:3000/build-details.html
 - http://localhost:3000/build-history.html
 
И простое API c командами:
- GET /api/settings — получение сохраненных настроек
- POST /api/settings - cохранение настроек
- GET  /api/builds - получение списка сборок
- POST /api/builds/:commitHash - добавление сборки в очередь
- GET  /api/builds/:buildId - получение информации о конкретной сборке
- GET  /api/builds/:buildId/logs - получение логов билда (сплошной текст)

При `POST /api/settings` кроме проксирования происходит клонирование репозиторя на локальную машину в папку `local_repo`. При повторном запросе репозиторий клонируется заново.

Дополнительн реализована ручка `GET /api/test` для стягивания последних изменений для текущего репозитория.

## Начало работы <a name = "getting_started"></a>

Для запуска приложения необходимо:
- Зайти в папку [src](src)
- Создать там файл `.env` с прописанным там вашим ключом авторизации к API с базой данных (аналогично файлу [.env.simple](src/.env.simple))
- Запустить сервер из консоли
```CLI
node app.js
```
- Доступ к серверу реализован через `http://localhost:3000`


Вернуться на [главную](README.md)
