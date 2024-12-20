// Скрипт для проверки
"use strict";
// строка с названием проекта
let title;
let screens;
let screenPrice;
let adaptive;
let rollback = 10;
let service1;
let servicePrice1;
let service2;
let servicePrice2;
let allServicePrices;
let fullPrice;
let servicePercentPrice;

const isString = function (Str) {
  return (
    (typeof Str === "string" || Str instanceof String) && Str.trim() !== ""
  );
};

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
  do {
    title = prompt("Как называется ваш проект?", "Калькулятор верстки");
  } while (!isString(title));
  do {
    screens = prompt(
      "Какие типы экранов нужно разработать?",
      "Простые, Сложные"
    );
  } while (!isString(screens));
  do {
    screenPrice = prompt("Сколько будет стоить данная работа?");
  } while (!isNumber(screenPrice));
  //(  isNaN(screenPrice) ||
  //   screenPrice === null ||
  //   screenPrice.trim() === ""
  // )
  adaptive = confirm("Нужен ли адаптив на сайте?", "Да, нужен");
};

const getAllServicePrices = function () {
  let sum = 0;
  let int_servicePrice;
  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      do {
        service1 = prompt("Какой дополнительный тип услуги нужен?");
      } while (!isString(service1));
    } else if (i === 1) {
      do {
        service2 = prompt("Какой дополнительный тип услуги нужен?");
      } while (!isString(service2));
    }
    do {
      int_servicePrice = prompt("Сколько это будет стоить?");
    } while (!isNumber(int_servicePrice));
    sum += int_servicePrice;
    int_servicePrice = false;
  }
  return sum;
  // return Number(servicePrice1) + Number(servicePrice2);
};
const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
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

asking();
//Результат сохраняем в переменную
title = getTitle(title);
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

//вызовы функции showTypeOf
showTypeOf(getTitle(title));
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log("allServicePrices", allServicePrices);
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
