# Расширения

Все стандартно созданные модульные расширения регистрируются в хранилище `FrontBoot.extensions`.
Через данное хранилище возможно управление расширением.

Рассмотрим расширение на основе vue
```php
// Интерфейс расширения
const extension = FrontBoot.extensions.get('my_extension');

// Параметры передаваемые в главный vue компонент
const data = {};

// Отрисовать vue приложение
extension.mount('#app', data);
```

> [!NOTE]
> Интерфейс расширение не регламентирован и определяется разработчиком.

`FrontBoot.extensions` является стандартной [картой](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).

## Регистрация своего расширения

```js
FrontBoot.extensions.set(
    'my_extension',
    function() {
        // ...
    }
);

FrontBoot.extensions.set(
    'my_extension2',
    {
        // ...
    }
);

FrontBoot.extensions.set(
    'my_extension3',
    new class {
        
    }
);
```