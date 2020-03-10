# Ответы на вопросы

## 1. правильное использование БЭМ-сущностей
- **какие части макета являются одним и тем же блоком?**

Примеры блоков, общих для всех страниц:
- `page` - основной макет страницы
- `header` - внури может быть заголовок(нескольких видов) + набор кнопок (0, 1, несколько)
- `main` - блок для отображения основного контента
- `footer` - внутри меню и копирайт

А также:
- `card` - карточка на странице `build-history` и `build-details` (для версии desktop и mobile)
- `btn-small`, `btn-big`, `icon` - кнопки (выделены в 2 разных блока), иконки (стили формируется автоматически при сборке спрайта)
- `icon-text` - блоки для отображения коммита, коммитера, времени и даты в карточке
- и т.д.

- **какие стили относятся к блокам, а какие к элементам и модификаторам?**

К **блокам** относятся стили, определяющие его внешний вид, и являющиеся общими для всех экземпляров этого блока. Обычно то, что находится "внутри": `width, height, color, background-color, padding, box-shadow` и др.
**Например:**
для блока `icon-text` - стили flexbox, определяющие постоянное горизонтальное расположение иконки и текста внутри блока.

К **модификаторам** относятся стили, определяющие внешний вид блока, но которые могут различаться в зависимости от типа блока: 
**Например:**
для блока `btn-big` существует модификатор `type` (`primary` или `secondary`), который влияет на св-ва кнопки `background-color`.

К **элементам** относятся стили, отвечающие за расположение блоков внутри другого блока, например `display`, `position`, `margin`, `float` и др. Элементы не имеют смысла вне блока.
**Например:**
За позиционирование блока `btn-big` в блоке `header` отвечает класс `header__btn-group`, а в блоке `form` - `form__btn-group`.

- **где нужно использовать каскады и почему**?

Каскады удобно использовать в блоках с большим количеством элементов. Каскад позволяют добавив модификатор блоку (т.е. родителю) и повлиять на поведение сразу многих дочерних элементов, вместо того, чтобы добавлять каждому элементу отдельный модификатор.
**Пример:**
Блок `card`, имеющий модификатор статуса задачи (`card_status_done`, `card_status_wait`, `card_status_fail`). Навешивание этого класса меняет одновременно стили вложенных элементов - иконку `card__icon` и цвет номера задачи `card__task-num`, без необходимости навешивать этим элементам дополнительные классы. 
    
## 2. консистентность
- **какие видите базовые и семантические константы?**

    **базовые константы:**
    - цвета (палитра)
    - скругления блоков (border-radius)
    - тени (пока мало, но могут добавиться еще)
    - отступы (снаружи или внутри блоков)
    - размеры шрифтов
    - межстрочные интервалы
    - толщина шрифтов
    - межсимвольные интервалы
    - набор возможных шрифтов (`font-400`, `font-500`), представляющий из себя микс вышеперечисленных констант (реализовано с помощью stylus-миксинов)
    - брейкпоинты
    
    **семантические:**
    - цвета (с понятными названиями) - некоторые константы дублируют друг друга. Но зато при любом изменении дизайна - значения их можно быстро поменять, не меняя название самой константы.
    - максимальная/минимальная ширина контента (а также ширина и высота других похожих элементов)
    - шрифты - для конкретного блока (реализованы с помощью классов-плейсхолдеров, которые потом используются в конкретных элементах, например, в `.font__title`, `.card__title` и др.). Возможно, это излишне. Возможно, лучше создавать для текстов отдельный класс `.text` и примиксовывать его на нужный узел. В проекте блок `.text` создан, но никуда не примиксовывается.
    
- **какие видите закономерности в интерфейсе**?

  - Контент не растягивается больше определенной ширины экрана.
  - У контента есть отсутпа слева/справа, чтобы не прилипать к экрану на маленьких разрешениях.

- **адаптивность**
  
  Реализована с помощью медиа-запросов + "резиновой" верстки с использованием flexbox
  Изменение верстки на мобильных экранах:
    - изменяется размер заголовка в `header`
    - у кнопок `btn-small` (состоящих из иконки и текста) пропадает текст
    - Некоторые кнопки растягиваются на всю ширину экрана (`btn-big` на странице `settings`, `card-list__show-more`) на странице `build-history`
    - в блоке `footer` элементы переносятся на 2 строки
    - в блоке карточка перестраиваются элементы, особенно элемент meta (не успел красиво реализовать, разделил на 2 элемента - `card__meta` и `card__time`)
    - у многих блоков меняются отступы 
    - т. д.

## 3. где видите вариативность данных и как это обрабатываете?

- какие видите особенности, связанные с размером экрана?
  на маленьких экранах меньше места, поэтому:
  - приходится уменьшать размеры блоков, чтобы все уместить (пример: заголовок в `header`, скрытие текста в иконко-текстовых кнопках btn-small)
  - менять расположение элементов, в первую очередь, с горизонтального на вертикальное (пример: кнопки на странице `settings`, мета-ифнормация в карточке)
  - интерактивные элементы делаются больше, чтобы удобно было наживать (пример: кнопки, растягивающиеся по ширине экрана)   
  - нужно учитывать отсутствие `hover `
   
- что еще повлияло на вашу вёрстку?
  - кривые руки
  - прямые извилины
  - дедлайн

    
