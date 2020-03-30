Вернуться на [главную](README.md)

> В настоящий момент многое НЕ готово. Продвигаюсь медленно. Планирую в течении недели все-таки выполнить задание.
> На данный момент сделано:
> - Созданы react-компоненты для css-блоков (css-стили разбиты по компонентам)
> - При открытии `/` (или `/start-screen`) происходит запрос за текущими настройками (во время выполнения запроса крутится лоадер). Если настройки есть - идет перенаправление на страницу `/build-history`, если их нет - на страницу `/start-screen`.
> - На странице `/settings` - простейшая css-валидация введенных значений.  
> - На странице `/settings` при клике на кнопку `Save` происходит добавление/обновление настроек репозитория, на время выполнения запроса (в частности, при клонировании репозитория) кнопки на странице блокируются. При клике на кнопку `Cancel` - переход на страницу `start-screen` (либо если настройки уже есть - на `build-history`).
> - На странице `/build-history` при клике на кнопку `Run build` открывается модальное окно. Закрывается оно по клику на кнопку `Cancel`. При клике по `Run build` в модальном окне происходит постановка введенного коммита в очередь сборки и перенаправление на страницу нового билда.


## Содержание

- [Начало работы](#getting_started)
- [Структура файлов](#file_tree)


## Начало работы <a name = "getting_started"></a>

Для запуска приложения необходимо:

### 1. Запустить NodeJS server

Посмотреть в [readme к домашке по node js](README-NODEJS.md#getting_started)

### 2. Запустить клиентское приложение React
- Зайти в папку [client](client)
- Запустить react-приложение из консоли
```CLI
npm start
```
- Доступ к приложению реализован через `http://localhost:3000`

## Структура файлов <a name = "file_tree"></a>

- Раздел в стадии наполнения

Вернуться на [главную](README.md)