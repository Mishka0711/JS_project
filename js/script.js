"use strict";

const title2 = document.getElementsByTagName("h1");
const main_buttons = document.getElementsByClassName("handler_btn");
const pl_button = document.querySelector(".screen-btn");
const other_items_perc = document.querySelectorAll(
  ".other-items" && ".percent"
);
const other_items_numb = document.querySelectorAll(".other-items" && ".number");
const inp_type = document.querySelector(".rollback");
const inp_type2 = inp_type.querySelector(["input[type=range]"]);
const tot_inp = document.getElementsByClassName("total-input");
const sp_range_value = document.querySelector("span" && ".range-value");
let screen_blocks = document.querySelectorAll(".screen");

const logger2 = function (a) {
  for (let i = 0; i < a.length; i++) {
    console.log(a[i]);
  }
};

console.log("1 Заголовок:");
logger2(title2);
console.log("2 Рассчитать и Сброс:");
logger2(main_buttons);
console.log("3 плюсик:");
console.log(pl_button);
console.log("4 other_items_perc:");
logger2(other_items_perc);
console.log("4 other_items_numb:");
logger2(other_items_numb);
console.log("5  input type=range:");
console.log(inp_type2);
console.log("6 span с классом range-value:");
console.log(sp_range_value);
console.log("7 все инпуты с классом total-input:");
logger2(tot_inp);
console.log("8 все блоки с классом screen:");
console.log(screen_blocks);

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  services: {},
  start: function () {
    appData.asking();
    appData.addPrices();
    appData.getFullPrice();
    appData.getServicePercentPrice();
    appData.getTitle();

    appData.logger();
  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  asking: function () {
    do {
      appData.title = prompt(
        "Как называется ваш проект?",
        "Калькулятор верстки"
      );
      // console.log(appData.isNumber(appData.title));
      // console.log(typeof appData.title);
    } while (
      appData.isNumber(appData.title) ||
      typeof appData.title != "string"
    );

    for (let i = 0; i < 2; i++) {
      let name = "";
      let price = 0;
      do {
        name = prompt("Какие типы экранов нужно разработать?");
      } while (appData.isNumber(name) || typeof name != "string");

      do {
        price = prompt("Сколько будет стоить данная работа?");
      } while (!appData.isNumber(price));

      appData.screens.push({ id: i, name: name, price: price });
      // а лучше screens.push({ i, name, price });
    }

    for (let i = 0; i < 2; i++) {
      let name = "";
      let price = 0;

      do {
        name = prompt("Какой дополнительный тип услуги нужен?");
      } while (appData.isNumber(name) || typeof name != "string");

      do {
        price = prompt("Сколько это будет стоить?");
      } while (!appData.isNumber(price));
      //усложненная домашка 1
      appData.services[name + " (услуга " + i + ")"] = +price;
    }

    appData.adaptive = confirm("Нужен ли адаптив на сайте?", "Да, нужен");
  },

  addPrices: function () {
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
    }
    console.log(appData.screenPrice);
    //усложненная домашка 2
    appData.screenPrice = appData.screens.reduce(function (sum, item) {
      return sum + +item.price;
    }, 0);

    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },

  getFullPrice: function () {
    appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
  },
  getServicePercentPrice: function () {
    appData.servicePercentPrice =
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
  },
  getTitle: function () {
    appData.title =
      appData.title.trim()[0].toUpperCase() +
      appData.title.trim().substr(1).toLowerCase();
  },
  getRollbackMessage: function (price) {
    if (price >= 30000) {
      return "Даем скидку в 10%";
    } else if (price >= 15000 && price < 30000) {
      return "Даем скидку в 5%";
    } else if (price >= 0 && price < 15000) {
      return "Скидка не предусмотрена";
    } else {
      return "Что то пошло не так";
    }
  },
  isString: function (Str) {
    return (
      (typeof Str === "string" || Str instanceof String) && Str.trim() !== ""
    );
  },
  logger: function () {
    console.log("allServicePrices", appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);

    console.log(appData.services);
    console.log(appData.screenPrice);
    // for (let key in appData) {
    //   console.log(appData[key]);
    // }
  },
};

// const isNumber = function (num) {
//   return !isNaN(parseFloat(num)) && isFinite(num);
// };

appData.start();
