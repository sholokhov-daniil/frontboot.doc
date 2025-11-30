# Создание расширения

## Автоматическое

Автоматическое создание производится через консольную команду

```bash
php ext create
```

## Ручное

Все расширения рекомендуется размещать в директории сайта ``/local/frontboot/``

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
Должна возвращать объект с конфигурацией расширения

```php
use Sholokhov\FrontBoot\Config;
use Sholokhov\FrontBoot\Locator\BaseLocator;
use Sholokhov\FrontBoot\Locator\BaseFrameworkLocator;
use Bitrix\Main\Localization\Loc;

if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
    die();
}

// Инициализируем языковые файлы
Loc::loadMessages(__FILE__);

// Вспомогательный класс, для поиска всех js и css файлов
$locator = new BaseFrameworkLocator(__DIR__);
// или (если в корне лежит папка js и css)
$locator = new BaseLocator(__DIR__);

$dir = str_replace($_SERVER['DOCUMENT_ROOT'], '',  __DIR__);

// Объект конфигурации
$extension = new Config;

// Полный путь до всех css файлов расширения
$extension->css = $locator->getCss();
// или
$extension->css = [
    $dir . '/style.css'
];

// Польный путь до всех js файлов расширения
$extension->js = $locator->getJs();
// или
$extension->js = [
    $dir . '/script.js'
];

// Полный путь до языкового файла расширения
$extension->lang = $locator->getLang();
// или
$extension->lang = $dir . "/lang/" . LANGUAGE_ID . "/options.php";

// Пропустить инициализацию core.js
$extension->skipCore = true;

// Инициализировать после регистрации
$extension->autoload = true;

// Ограничение области подключения расширения
$extension->use = CJSCore::USE_PUBLIC;

// Связанные расширения, которые должны инициализироваться до инициализации текущего расширения
$extension->rel = [
    'ui.alerts'
];

// Возвращаем объект конфигурации, для его регистрации
return $extension;
```

Минимальный пример:

```php
use Sholokhov\FrontBoot\Config;

if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
    die();
}

$extension = new Config;

// Если есть js файлы
$extension->js = ['path'];

// Если есть css файлы
$extension->css = ['path'];

return $extension;
```