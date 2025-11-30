# Установка

1. Перейдите в папку /local/modules/ или /bitrix/modules/
2. Создайте папку **sholokhov.frontboot**
3. Склонируйте содержимое репозитория в созданную папку
4. Через консоль перейдите в корень модуля и выполните команду ``composer install``, для установки всех зависимостей.
5. Зайдите в административную часть bitrix и перейдите в ``marketplace`` -> ``Установленные решения``. Пример ссылки ``https://example.ru/bitrix/admin/partner_modules.php?lang=ru``
6. Найдите модуль с названием ``FrontBoot (sholokhov.frontboot)`` и установите его

Теперь модуль полностью установлен и готов к работе.


## Инициализация

::: code-group

```php []
CJSCore::Init(['extension_id']);
```

```js []
BX.loadExt('extension_id').then(() => {
    // код после загрузки
});
```

:::