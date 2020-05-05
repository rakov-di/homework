# CI-сервер

> [README](README-SW.md) к домашке по Воркерам

## Содержание <a name="content_table"></a>

- [Описание](#about)
- [Начало работы](#getting_started)
- [Структура файлов](#file_tree)
- [TODO](#todo)
- [Архив с readme предыдущих домашек](#archive)

## Описание <a name="about"></a>

На данный момент созданы 28 unit-тестов для контроллеров сервера и 31 интеграционный тестов для клиентских страниц.


## Начало работы <a name="getting_started"></a>

В корне репозитория необходимо установить все npm-зависимости:
```bash
npm i
``` 

Запустить сервер:

Переименовать файл [.env.example](server/.env.example) в файл `.env`. Подставить в поле `SHRI_API_KEY` свой ключ авторизации ([ссылка для получения ключа](https://hw.shri.yandex/)):

```bash
cd server && npm ci && npm start
```
Запустить клиентское-приложение
```bash
cd client && npm ci && npm start
```

Для запуска unit-тестов
```bash
cd tests && npm i && npm run tests_unit
```
Для запуска интеграционных тестов - дополнительно установить и заупстить в отдельной вкладке selenium server.
```bash
selenium-standalone install && selenium-standalone start
```
Запустить интеграционные тесты
```
npm run tests_hermione
```
Запуск всех тестов сразу:
```bash
npm test
``` 

Вернуться [К содержанию](#content_table)

## Структура файлов <a name="file_tree"></a>

Вернуться [К содержанию](#content_table)

## TODO <a name="todo"></a>


Клиент:
-Убрать из redux статус отправки формы (заодно починится баг с показом старого статуса формы в новой)
- Заменить Component на PureComponent где необходимо
- Доразделить стили для компонетов `Card` и `Icon` (для этого поменять принцип создания svg-спрайта с иконками)
- Добавить обработчик на кнопку Show more на странице `/build-history`.
- Заменить stylus на sass (чтобы избавиться от cra eject) ??
- Внимательнее изучить ревью, там много полезного

Сервер:
- Добавить кэш

Тесты:
- Интеграционные тесты для клиента
   - Настроить тесты скриншотами (assertView)
   - Скрыть лишние файлы отчетов (через `.gitignore`)
- Создать unit-тесты для git-операций на сервера
- Внимательнее изучить ревью, там много полезного

Общее:
- Проверить в коде не осталось ли незакрытых TODO

Вернуться [К содержанию](#content_table)



# Архив с readme предыдущих домашек <a name="archive"></a>

- [Верстка (БЭМ)](README-BEM.md)
- [NodeJS](README-NODEJS.md)
- [React](README-REACT.md)
- [Tests](README-TESTS.md)
