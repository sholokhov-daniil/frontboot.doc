# Вспомогательные класса для JavaScript

Для упрощения взаимодействия с BX js был разработан глобальный объект ``FrontBoot``.  
``FrontBoot`` инициализируется автоматически при старте страницы, но порядок его загрузки не гарантирован, и для этого рекомендуем в ``option.php`` вашего расширения указать связь в ``rel``.  
При использовании консольной команды ``php ext create`` связь указывается автоматически.

```php
// option.php
use Sholokhov\FrontBoot\Config;

$extension = new Config;
$extension->rel = [
    'frontboot.core' // [!code highlight]
];

return $extension;
```
