// Скрипт для проверки
"use strict";
// строка с названием проекта
const title = prompt("Как называется ваш проект?");
//строка с названиями типов экранов через запятую
let screens = prompt("Какие типы экранов нужно разработать?");
const screenPrice = prompt("Сколько будет стоить данная работа?");
//булевое значение
let adaptive = false;
const adaptive_on = prompt("Нужен ли адаптив на сайте?", "Да, нужен");
const service1 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice1 = +prompt("Сколько это будет стоить?");
console.log(typeof servicePrice1 + " servicePrice1: ", servicePrice1);
const service2 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice2 = +prompt("Сколько это будет стоить?");
console.log(typeof servicePrice2 + " servicePrice2: ", servicePrice2);
const rollback = 10;

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getAllServicePrices = function (servicePrice1, servicePrice2) {
  return Number(servicePrice1) + Number(servicePrice2);
};

const getFullPrice = function (screenPrice, allServicePrices) {
  return Number(screenPrice) + Number(allServicePrices);
};

const getTitle = function (int_title) {
  int_title = int_title.replace(/^\s*/gm, "");
  int_title = int_title.toLowerCase();
  let first_letter = int_title[0];
  return first_letter.toUpperCase() + int_title.slice(1);
};

const getServicePercentPrices = function (fullPrice, rollback) {
  return fullPrice - Math.ceil(fullPrice * (rollback / 100));
};

const getRollbackMessage = function (price) {
  switch (true) {
    case price > 30000:
      return "Даем скидку в 10%";
      break; //остановка работы блока
    case price > 15000 && price <= 30000:
      return "Даем скидку в 5%";
      break; //остановка работы блока
    case price > 0 && price <= 15000:
      return "Скидка не предусмотрена";
      break; //остановка работы блока
    default:
      return "Что то пошло не так";
  }
};

if (adaptive_on == "Да, нужен") {
  adaptive = true;
}
//Результат сохраняем в переменную
const allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
const fullPrice = getFullPrice(screenPrice, allServicePrices);
const servicePercentPrice = getServicePercentPrices(fullPrice, rollback);
//вызовы функции showTypeOf
showTypeOf(getTitle(title));
showTypeOf(screenPrice);
showTypeOf(adaptive);
//вывод строки с типами экранов для разработки screens
if (screens != null) {
  console.log("length screens: ", screens.length);
  screens = screens.toLowerCase();
  console.log("прописное screens: ", screens);
  console.log("массив screens: ", screens.split(", "));
} else {
  console.log("типы экранов не заданы");
}
//сообщение о скидке пользователю (вызовы функции getRollbackMessage)
console.log(getRollbackMessage(servicePercentPrice));
//стоимость за вычетом процента отката посреднику
console.log(getServicePercentPrices(fullPrice, rollback));
