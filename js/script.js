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
    this.addTitle();
    this.screensCheck();
    screensElements1.addEventListener("input", this.screensCheck);
    cms_open.addEventListener("change", this.cms_block);
    cms_open_var
      .querySelector("select")
      .addEventListener("input", this.cms_block);
    document
      .querySelector("#cms-other-input")
      .addEventListener("input", this.cms_block);
    console.log("проверка перед условием " + this.screensCheckErrors);

    buttonPlus.addEventListener("click", this.addScreensBlock);
    inputRange.addEventListener("change", this.rangered);
    resetBtn.addEventListener("click", this.reset);
  },
  rangered: function () {
    // console.log(inputRange.value);
    this.rollback = inputRange.value;
    inputRangeValue.textContent = inputRange.value + "%";
    if (total.value > 0) {
      appData.start();
    }
  },
  addTitle: function () {
    console.log(title.textContent);
    document.title = title.textContent;
  },
  start: function (event) {
    console.log(this);
    // const th_addScreens = addScreens().bind(appData);
    // th_addScreens();
    appData.addScreens();
    appData.addSevices();
    appData.addPrices();
    // this.getServicePercentPrice();
    //this.logger();
    console.log(appData);
    appData.blocked_fields(true);
    appData.showResult();
  },
  reset: function () {
    appData.clearScreens();
    appData.clearServices();
    appData.clearTotals();
    appData.blocked_fields(false);
    appData.cms_block();
    appData.screensCheck();
  },
  cms_block: function () {
    this.cms_percent = 0;
    const cms_variants = document.querySelector(".hidden-cms-variants");
    // console.log(cms_open_var_other);
    // console.log(cms_open_var.querySelector("select").value);
    if (cms_open.checked) {
      cms_variants.style.display = "flex";
      if (cms_open_var.querySelector("select").value === "other") {
        cms_open_var_other.style.display = "flex";
        this.cms_percent =
          +document.querySelector("#cms-other-input").value * 0.01;
      } else {
        cms_open_var_other.style.display = "none";
        this.cms_percent = +cms_open_var.querySelector("select").value * 0.01;
      }
    } else {
      cms_variants.style.display = "none";
    }
    console.log("cms_percent ", this.cms_percent);
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
      buttonPlus.removeEventListener("click", this.addScreensBlock);
      startBtn.style.display = "none";
      resetBtn.style.display = "";
    } else {
      buttonPlus.addEventListener("click", this.addScreensBlock);
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
    this.screensCheckErrors = 0;
    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;
      console.log(+select.value);
      console.log(+input.value);
      if (+select.value === 0 || +input.value === 0) {
        this.screensCheckErrors++;
      }
    });
    if (this.screensCheckErrors > 0) {
      startBtn.textContent = "Неправильно заполнены экраны";
    } else {
      startBtn.textContent = "Рассчитать";
    }
    console.log(this.screens);
    console.log("Ошибок в экранах " + this.screensCheckErrors);
    if (this.screensCheckErrors === 0) {
      console.log(this.screensCheckErrors);
      startBtn.addEventListener("click", this.start);
      console.log("рассчитываем");
    } else {
      startBtn.removeEventListener("click", this.start);
      console.log("не могу рассчитать");
    }
  },
  addScreens: function () {
    this.screens = [];
    this.screensCount = 0;
    screens = document.querySelectorAll(".screen");
    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;
      this.screensCount += +input.value;
      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
      });
    });
    console.log(this.screens);
  },

  addSevices: function () {
    this.servicesNumber = {};
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");
      check.classList.add = "blocked";
      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });
    otherItemsNumber.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addScreensBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    console.log(cloneScreen);
    screens[screens.length - 1].after(cloneScreen);
    this.screensCheck();
  },

  addPrices: function () {
    this.screenPrice = 0;
    this.servicePricesNumber = 0;
    this.servicePricesPercent = 0;
    for (let screen of this.screens) {
      this.screenPrice += +screen.price;
    }

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (let key in this.servicesPercent) {
      this.servicePricesPercent +=
        this.screenPrice * (this.servicesPercent[key] / 100);
    }

    this.fullPrice =
      +this.screenPrice +
      this.servicePricesNumber +
      this.servicePricesPercent +
      this.cms_percent * this.screenPrice;

    this.servicePercentPrice =
      this.fullPrice - this.fullPrice * (this.rollback / 100);
  },
  showResult: function () {
    total.value = this.screenPrice;
    totalCountOther.value =
      this.servicePricesPercent + this.servicePricesNumber;
    fullTotalCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
    totalCount.value = this.screensCount;
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
    console.log("this" + this);
    console.log("fullPrice", this.fullPrice);
    console.log("fullPrice", this.fullPrice);
    console.log(this.servicePercentPrice);
    console.log(this.screens);
    console.log(this.services);
    console.log(this.screenPrice);
    // for (let key in appData) {
    //   console.log(appData[key]);
    // }
  },
};

// const isNumber = function (num) {
//   return !isNaN(parseFloat(num)) && isFinite(num);
// };

appData.init();
