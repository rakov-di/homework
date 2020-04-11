Вернуться на [главную](README.md)

## Содержание

- [Описание домашки по NodeJS](#about)
- [Начало работы](#getting_started)
- [Структура файлов](#file_tree)

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

При `POST /api/settings` кроме проксирования происходит клонирование репозиторя на локальную машину в папку `local_repo`. Имя репозитория надо указывать полное (например, `https://github.com/rakov-di/homework_async`). При повторном запросе репозиторий клонируется заново.

Дополнительно:
- реализована ручка `GET /api/test` для стягивания последних изменений для текущего репозитория (git pull) - без проверки на наличие новых коммитов.
- реализован простой кэш - никак не инвалидируется и не отслеживает переполнение.

В проекте подключен `app.use(express.urlencoded())`, т.к. из postman не удавалось отправить обычный json. Вручную через `axios` получается. 

## Начало работы <a name = "getting_started"></a>

Для запуска приложения необходимо:
- Зайти в папку [server](server)
- Создать там файл `.env` с прописанным там вашим ключом авторизации к API с базой данных (аналогично файлу [.env.simple](src/.env.simple))
- Запустить сервер из консоли
```CLI
node app.js
```
- Доступ к серверу реализован через `http://localhost:5000`

## Структура файлов <a name = "file_tree"></a>

- [server/app.js](server/app.js) - основное приложение, где происходит отправка запроса к ручкам
- [server/utils/git.js](server/utils/git.js) - набор функций для работы с git
- [server/utils/buildLogs.js](server/utils/buildLogs.js) - простейший кэш для запроса логов билда
- [.env](server/.env.example)``/`` - файл с ключом авторизации, для прописывания его в локальные переменные окружения (заглушка, надо переименовать в `.env` и прописать свой ключ)
- [server/utils/queries.js](server/utils/queries.js)``/`` - файл для имитации POST-запросов с параметрами. Помимо него использовал postman.
 
Вернуться на [главную](README.md)
