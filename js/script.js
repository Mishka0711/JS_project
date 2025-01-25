"use strict";

const title = document.getElementsByTagName("h1")[0];
const buttonPlus = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");

const inputRange = document.querySelector(".rollback input");
const inputRangeValue = document.querySelector(".rollback .range-value");

const startBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];

const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const fullTotalCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];
const cms_open = document.getElementById("cms-open");
const cms_open_var = document.querySelector(".hidden-cms-variants");
const cms_open_var_other = document.querySelector(
  ".hidden-cms-variants > .main-controls__input"
);

let screens = document.querySelectorAll(".screen");

let screensElements1 = document.querySelector(".main-controls__views");
// let screensElements2 = document.querySelector(".main-controls__input");

const appData = {
  title: "",
  screensCheckErrors: 0,
  screensCount: 0,
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  cms_percent: 0,

  init: function () {
    appData.addTitle();
    appData.screensCheck();
    screensElements1.addEventListener("input", appData.screensCheck);
    cms_open.addEventListener("change", appData.cms_block);
    cms_open_var
      .querySelector("select")
      .addEventListener("input", appData.cms_block);
    document
      .querySelector("#cms-other-input")
      .addEventListener("input", appData.cms_block);
    console.log("проверка перед условием " + appData.screensCheckErrors);

    buttonPlus.addEventListener("click", appData.addScreensBlock);
    inputRange.addEventListener("change", appData.rangered);
    resetBtn.addEventListener("click", appData.reset);
  },
  rangered: function () {
    // console.log(inputRange.value);
    appData.rollback = inputRange.value;
    inputRangeValue.textContent = inputRange.value + "%";
    if (total.value > 0) {
      console.log(this);
      this.start().bind(appData);
    }
  },
  addTitle: function () {
    console.log(title.textContent);
    document.title = title.textContent;
  },
  start: function () {
    this.addScreens();
    this.addSevices();
    this.addPrices();
    // appData.getServicePercentPrice();
    // appData.logger();
    console.log(appData);
    this.blocked_fields(true);
    this.showResult();
  },
  reset: () => {
    this.clearScreens();
    this.clearServices();
    this.clearTotals();
    this.blocked_fields(false);
    this.cms_block();
    this.screensCheck();
  },
  cms_block: function () {
    appData.cms_percent = 0;
    const cms_variants = document.querySelector(".hidden-cms-variants");
    // console.log(cms_open_var_other);
    // console.log(cms_open_var.querySelector("select").value);
    if (cms_open.checked) {
      cms_variants.style.display = "flex";
      if (cms_open_var.querySelector("select").value === "other") {
        cms_open_var_other.style.display = "flex";
        appData.cms_percent =
          +document.querySelector("#cms-other-input").value * 0.01;
      } else {
        cms_open_var_other.style.display = "none";
        appData.cms_percent =
          +cms_open_var.querySelector("select").value * 0.01;
      }
    } else {
      cms_variants.style.display = "none";
    }
    console.log("cms_percent ", appData.cms_percent);
  },
  clearTotals: function () {
    const totals = document.querySelectorAll(".total-input");
    totals.forEach((tot_input) => {
      tot_input.value = "";
    });
  },
  clearServices: function () {
    //блокируем раздел services
    const bl_sevices = document.querySelectorAll("input[type=checkbox]");
    bl_sevices.forEach((service) => {
      service.checked = false;
    });
    cms_open_var.querySelector("select").value = "";
    document.querySelector("#cms-other-input").value = "";
  },
  clearScreens: function () {
    //удаление добавленных экранов
    screens.forEach((screen, index) => {
      console.log(screen);
      if (index > 0) {
        screens[index].remove();
      } else {
        console.log(screen.querySelector("select").value);
        screen.querySelector("input[type=text]").value = "";
        screen.querySelector("select").value = "";
      }
    });
  },
  blocked_fields: function (blocked_param) {
    //блокируем или разблокируем раздел screens
    const bl_screens = document.querySelectorAll(".screen");
    bl_screens.forEach((screen) => {
      screen.querySelector("select").disabled = blocked_param;
      screen.querySelector("input[type=text]").disabled = blocked_param;
    });
    //блокируем или разблокируем раздел services
    const bl_sevices = document.querySelectorAll("input[type=checkbox]");
    bl_sevices.forEach((service) => {
      service.disabled = blocked_param;
    });
    //блокируем добавление новых экранов
    if (blocked_param === true) {
      //блокируем кнопку рассчитать и показываем reset
      buttonPlus.removeEventListener("click", appData.addScreensBlock);
      startBtn.style.display = "none";
      resetBtn.style.display = "";
    } else {
      buttonPlus.addEventListener("click", appData.addScreensBlock);
      //разблокируем кнопку рассчитать и скрываем reset
      startBtn.style.display = "";
      resetBtn.style.display = "none";
    }
  },

  // isNumber: function (num) {
  //   return !isNaN(parseFloat(num)) && isFinite(num);
  // },
  screensCheck: function () {
    screens = document.querySelectorAll(".screen");
    appData.screensCheckErrors = 0;
    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;
      console.log(+select.value);
      console.log(+input.value);
      if (+select.value === 0 || +input.value === 0) {
        appData.screensCheckErrors++;
      }
    });
    if (appData.screensCheckErrors > 0) {
      startBtn.textContent = "Неправильно заполнены экраны";
    } else {
      startBtn.textContent = "Рассчитать";
    }
    console.log(appData.screens);
    console.log("Ошибок в экранах " + appData.screensCheckErrors);
    if (appData.screensCheckErrors === 0) {
      console.log(appData.screensCheckErrors);
      console.log(this);
      startBtn.addEventListener("click", this.start.bind(appData));
      console.log("рассчитываем");
    } else {
      console.log(this);
      startBtn.removeEventListener("click", this.start.bind(appData));
      console.log("не могу рассчитать");
    }
  },
  addScreens: function () {
    appData.screens = [];
    appData.screensCount = 0;
    screens = document.querySelectorAll(".screen");
    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;
      appData.screensCount += +input.value;
      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
      });
    });
    console.log(appData.screens);
  },

  addSevices: function () {
    appData.servicesNumber = {};
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");
      check.classList.add = "blocked";
      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });
    otherItemsNumber.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addScreensBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    console.log(cloneScreen);
    screens[screens.length - 1].after(cloneScreen);
    appData.screensCheck();
  },

  addPrices: function () {
    appData.screenPrice = 0;
    appData.servicePricesNumber = 0;
    appData.servicePricesPercent = 0;
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
    }

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent +=
        appData.screenPrice * (appData.servicesPercent[key] / 100);
    }

    appData.fullPrice =
      +appData.screenPrice +
      appData.servicePricesNumber +
      appData.servicePricesPercent +
      appData.cms_percent * appData.screenPrice;

    appData.servicePercentPrice =
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
  },
  showResult: function () {
    total.value = appData.screenPrice;
    totalCountOther.value =
      appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;
    totalCountRollback.value = appData.servicePercentPrice;
    totalCount.value = appData.screensCount;
  },
  // getServicePercentPrice: function () {},

  // getRollbackMessage: function (price) {
  //   if (price >= 30000) {
  //     return "Даем скидку в 10%";
  //   } else if (price >= 15000 && price < 30000) {
  //     return "Даем скидку в 5%";
  //   } else if (price >= 0 && price < 15000) {
  //     return "Скидка не предусмотрена";
  //   } else {
  //     return "Что то пошло не так";
  //   }
  // },
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

appData.init();
