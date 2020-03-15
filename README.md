Облачная функция для Object Storage
===================================

Как загрузить
-------------

Этот код можно положить в [Yandex Cloud Functions](https://cloud.yandex.ru/services/functions). Для этого нужно упаковать файла index.js и node_modules (установите их) в zip и положить сначала в [Yandex Object Storage](https://cloud.yandex.ru/services/storage) (загрузить напрямую в функцию не получится из-за размера). Затем загружаем код в функцию из object storege.

Как пользоваться
----------------
В переменных окружения функции нужно указать KEY_ID и ACCESS_TOKEN вашего сервисного аккаунта для доступа к Object Storage. [Как их получить] (https://cloud.yandex.ru/docs/storage/tools/aws-cli#before-you-begin). Также нужно указать переменную окружения BUCKET с названием бакета, с которым будет работать функция.

После этого запросы GET и POST в функцию будут читать и писать в Object Storage. Ключ для чтения и записи передаётся в параметре запроса key.
