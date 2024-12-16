// файл для быстрого тестирования
"use strict";
let servicePercentPrice = 0;
switch (true) {
  case servicePercentPrice > 30000:
    console.log("Даем скидку в 10%");
    break; //остановка работы блока
  case servicePercentPrice > 15000 && servicePercentPrice <= 30000:
    console.log("Даем скидку в 5%");
    break; //остановка работы блока
  case servicePercentPrice > 0 && servicePercentPrice <= 15000:
    console.log("Скидка не предусмотрена");
    break; //остановка работы блока
  default:
    console.log("Что то пошло не так");
}
