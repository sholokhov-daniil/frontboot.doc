# Многоязычность

На уровне JavaScript мы можем работать с языковыми файлами, которые мы создали в папке ``lang``.  
Они автоматически инициализируются и доступны в коде.

```js
FrontBoot.getMessage('MY_LANG');

// или
BX.message('MY_LANG');

// или
BX.Loc.getMessage('MY_LANG');
```

> [!WARNING]
> Не стоит забывать, что, если мы попытаемся обратиться к языковому сообщению, которого не существует, то получим исключение

При работе с языковыми файлами рекомендует использовать объект ``BX.Loc``

```js
let message;
const key = "MSG_KEY";

// ✅ Безопасно (рекомендуем)
message = FrontBoot.getMessage(key);

// ✅ Безопасно
if (BX.Loc.hasMessage(key)) {
    message = BX.Loc.getMessage(key);
}

// ❌ Небезопасно
message = BX.Loc.getMessage(key);

// ❌ Небезопасно
message = BX.message(key);
```