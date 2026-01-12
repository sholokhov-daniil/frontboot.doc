# Создание расширения

## Автоматическое

Автоматическое создание производится через [консольную команду](https://sholokhov-daniil.github.io/frontboot.doc/0.2.x/cli#%D0%B3%D0%B5%D0%BD%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D1%8F-%D1%80%D0%B0%D1%81%D1%88%D0%B8%D1%80%D0%B5%D0%BD%D0%B8%D1%8F)

## Ручное

Все расширения рекомендуется размещать в директории сайта ``/local/frontboot/``

Для ручной регистрации расширения необходимо производить через [консольную команду](https://sholokhov-daniil.github.io/frontboot.doc/0.2.x/cli#%D1%80%D0%B5%D0%B3%D0%B8%D1%81%D1%82%D1%80%D0%B0%D1%86%D0%B8%D1%8F-%D1%80%D0%B0%D1%81%D1%88%D0%B8%D1%80%D0%B5%D0%BD%D0%B8%D1%8F)


### Структура папок

```
extension/  # Корневая директория расширения
├── lang    # Папка с языковыми файлами (необязательно)
│   ├── ru
│   │   └──  option.php
│   ├── en  
│   │   └──  option.php  
└── option.php # Основной конфигурационный файл расширения (обязателен)
```

### Языковые файлы

Языковой файл представляет [штатную реализацию](https://dev.1c-bitrix.ru/learning/course/index.php?COURSE_ID=43&LESSON_ID=4789).

```php
<?php
$MESS['UNIQUE_KEY'] = "Текст";
```

### Конфигурация (option.php)
В файле `option.php` хранится основная конфигурация нашего расширения.

Рассмотрим минимальную жизнеспособность конфигурацию
```php
use Sholokhov\FrontBoot\Config;

if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
    die();
}

$config = new Config;

// Если есть js файлы
$config->js = ['path'];

// Если есть css файлы
$config->css = ['path'];

return $config;
```

Все пути до файлов внутри `option.php` должны указываться относительными - не имея `DOCUMENT_ROOT`.  

#### Локаторы

Для удобства поиска js, css и lang, были разработаны локаторы:

- `BaseLocator` - подходит для кастомной структуры расширения
- `BaseFrameworkLocator` - подходит, для различных фреймворков

Рассмотрим пример использования локаторов.

**BaseLocator**

Является базовым и наиболее гибким локатором, который можно использовать, если другие доступные локаторы не подходят.  
В конструктор локатора необходимо передать полный путь до корня расширения.

> Если наше расширение выступает в качестве прокси, то в конструктор передаем путь до папки, где размещаются подключаемые скрипты.  
> Необходимо заметить, что при вызове метода `$locator->getLang();` вернется путь на основе того, который был передан в конструктор.


###### Инициализация

```php
use Sholokhov\FrontBoot\Locator\BaseLocator;

// Полный путь до корня расширения
$root = __DIR__;

$locator = new BaseLocator($root);
```

###### Получение списка доступных css

```php
// Возвращает массив css файлов из папки {root}/css
$locator->getCss();

// Возвращает массив css файлов из папки {root}/custom_css
$locator->getCss('custom_css');

// Возвращает массив css файлов из корня расщирения {root}/
$locator->getCss('');
```

###### Получение списка доступных js
```php
// Возвращает массив js файлов из папки {root}/js
$locator->getJs();

// Возвращает массив js файлов из папки {root}/custom_js
$locator->getJs('custom_js');

// Возвращает массив js файлов из корня расширения {root}/
$locator->getJs('');
```

###### Получение пути до языкового файла
```php
// Возврщает путь до языкового файла {root}/lang/{lang_id}/option.php
$locator->getLang();
```

##### BaseFrameworkLocator

Служит, для упрощения поиска подгружаемых файлов фреймворка с возможностью переопределения директории хранения скомпилированных файлов.   
По умолчанию локатеор производит поиск css и js файлов в директории `dist`

###### Инициализация

```php
use Sholokhov\FrontBoot\Locator\BaseFrameworkLocator;

// Полный путь до корня расширения
$root = __DIR__;

// После передачи root он виду изменяется по формату {root}/{dist}
$locator = new BaseFrameworkLocator($root);
```

###### Изменение директории хранения скомпилированных файлов

```php
// Теперь сканирование css и js будет производиться по пути {root}/my_dist
$locator->setDistPath('my_dist')
```

###### Получение списка доступных css

```php
// Возвращает массив css файлов из папки {root}/{dist}/css
$locator->getCss();

// Возвращает массив css файлов из папки {root}/{dist}/custom_css
$locator->getCss('custom_css');

// Возвращает массив css файлов из корня расщирения {root}/{dist}/
$locator->getCss('');
```

###### Получение списка доступных js
```php
// Возвращает массив js файлов из папки {root}/{dist}/js
$locator->getJs();

// Возвращает массив js файлов из папки {root}/{dist}/custom_js
$locator->getJs('custom_js');

// Возвращает массив js файлов из корня расширения {root}/{dist}/
$locator->getJs('');
```

###### Получение пути до языкового файла
```php
// Возврщает путь до языкового файла {root}/lang/{lang_id}/option.php
$locator->getLang();
```

###### Использование локаторов

```php
use Sholokhov\FrontBoot\Config;
use Sholokhov\FrontBoot\Locator\BaseLocator;

$config = new Config;
$locator = new BaseLocator(__DIR__);

$config->css = $locator->getCss();
$config->js = $locator->getJs();
```

#### Конфигурационные параметры

###### Путь до подключаемых js

```php
$config->js = [
    'path/script.js'
];
```

###### Путь до css

```php
$config->css = [
    'path/style.css'
];
```

###### Путь до языковых файлов

```php
$config->lang = $root . "/lang/" . LANGUAGE_ID . "/options.php";
```

###### Пропустить инициализацию core.js

```php
$config->skipCore = true;
```

###### Инициализировать после регистрации

```php
$config->autoload = true;
```

###### Ограничение области подключения расширения

Более подробное описание по доступным значениям описана в [документации bitrix](https://dev.1c-bitrix.ru/api_help/js_lib/my_extension/index.php)

```php
$config->use = CJSCore::USE_PUBLIC;
```

###### Связанные расширения

Возможно указать какие расширения необходимо инициализировать до загрузки вашего расширения.

```php
$config->rel = [
    'ui.alerts'
];
```
