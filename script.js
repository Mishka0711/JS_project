// Скрипт для проверки
"use strict";
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// строка с названием проекта
let title = prompt("Как называется ваш проект?");
console.log("type title: ", typeof title);

//строка с названиями типов экранов через запятую
// let screens = "Простые, Сложные, Интерактивные";
let screens = prompt("Какие типы экранов нужно разработать?");
if (screens != null) {
  console.log("length screens: ", screens.length);
  screens = screens.toLowerCase();
  console.log("прописное screens: ", screens);
  console.log("массив screens: ", screens.split(", "));
} else {
  console.log("типы экранов не заданы");
}

//любое число
// let screenPrice = Math.random();
let screenPrice = prompt("Сколько будет стоить данная работа?");
console.log(screenPrice);
console.log(
  "Стоимость верстки экранов (" + screenPrice + ") рублей/ долларов/гривен/юани"
);

//булевое значение
let adaptive = false;
let adaptive_on = prompt("Нужен ли адаптив на сайте?", "Да, нужен");
if (adaptive_on == "Да, нужен") {
  adaptive = true;
}
console.log("adaptive: " + adaptive + " " + typeof adaptive);

let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
console.log(typeof servicePrice1 + " servicePrice1: ", servicePrice1);
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");
console.log(typeof servicePrice2 + " servicePrice2: ", servicePrice2);

let fullPrice =
  Number(screenPrice) + Number(servicePrice1) + Number(servicePrice2);

//любое число (сколько хотите заработать),
// let fullPrice = 333333;
console.log("type fullPrice: ", typeof fullPrice);
console.log(
  "Стоимость разработки сайта (" + fullPrice + ") рублей/ долларов/гривен/юани"
);

//любое число от 1 до 100
let rollback = getRandomInt(0, 100);
console.log("рандомно от 0 до 100: ", rollback);
console.log(
  "Вознаграждение посреднику (" +
    Math.ceil(fullPrice * (rollback / 100)) +
    ") рублей/ долларов/гривен/юани"
);

const servicePercentPrice = fullPrice - Math.ceil(fullPrice * (rollback / 100));
console.log(
  "Итоговая стоимость за вычетом вознаграждения (" +
    servicePercentPrice +
    ") рублей/ долларов/гривен/юани"
);

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

//1 метод
// let answer = confirm("Тебе есть 18 лет?");
// console.log(answer);
