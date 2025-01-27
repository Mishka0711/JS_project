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
const cmsOpen = document.getElementById("cms-open");
const cmsOpenVar = document.querySelector(".hidden-cms-variants");
const cmsOpenVarOther = document.querySelector(
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
  cmsPercent: 0,

  init: function () {
    // console.log("init " + this);
    // console.log(this);
    this.addTitle();
    this.screensCheck();
    screensElements1.addEventListener("input", () => {
      this.screensCheck();
    });
    cmsOpen.addEventListener("change", () => {
      this.cmsBlock();
    });
    cmsOpenVar.querySelector("select").addEventListener("input", () => {
      this.cmsBlock();
    });
    document.querySelector("#cms-other-input").addEventListener("input", () => {
      this.cmsBlock();
    });
    console.log("проверка перед условием " + this.screensCheckErrors);

    buttonPlus.addEventListener("click", () => {
      this.addScreensBlock();
    });
    inputRange.addEventListener("change", () => {
      this.rangered();
    });
    resetBtn.addEventListener("click", () => {
      this.reset();
    });
  },
  rangered: function () {
    this.rollback = inputRange.value;
    inputRangeValue.textContent = inputRange.value + "%";
    console.log("total.value" + total.value);
    if (total.value > 0) {
      // this.start().bind(appData);
      // this.addScreens();
      // this.addSevices();
      this.addPrices();
      this.showResult();
    }
  },
  addTitle: function () {
    console.log(title.textContent);
    document.title = title.textContent;
  },
  start: function () {
    console.log(this);
    this.addScreens();
    this.addSevices();
    this.addPrices();
    // this.getServicePercentPrice();
    // this.logger();
    // console.log(this);
    // this.rangered();
    this.showResult();
    this.blockedFields(true);
    console.log("start working");
  },
  reset: function () {
    this.clearScreens();
    this.clearServices();
    this.clearTotals();
    this.blockedFields(false);
    this.cmsBlock();
    this.screensCheck();
  },
  cmsBlock: function () {
    this.cmsPercent = 0;
    const cmsVariants = document.querySelector(".hidden-cms-variants");
    // console.log(cmsOpenVarOther);
    // console.log(cmsOpenVar.querySelector("select").value);
    if (cmsOpen.checked) {
      cmsVariants.style.display = "flex";
      if (cmsOpenVar.querySelector("select").value === "other") {
        cmsOpenVarOther.style.display = "flex";
        this.cmsPercent =
          +document.querySelector("#cms-other-input").value * 0.01;
      } else {
        cmsOpenVarOther.style.display = "none";
        this.cmsPercent = +cmsOpenVar.querySelector("select").value * 0.01;
      }
    } else {
      cmsVariants.style.display = "none";
    }
    console.log("cmsPercent ", this.cmsPercent);
  },
  clearTotals: function () {
    const totals = document.querySelectorAll(".total-input");
    totals.forEach((totInput) => {
      totInput.value = "";
    });
  },
  clearServices: function () {
    //блокируем раздел services
    const blSevices = document.querySelectorAll("input[type=checkbox]");
    blSevices.forEach((service) => {
      service.checked = false;
    });
    cmsOpenVar.querySelector("select").value = "";
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
  blockedFields: function (blockedParam) {
    //блокируем или разблокируем раздел screens
    const blScreens = document.querySelectorAll(".screen");
    blScreens.forEach((screen) => {
      screen.querySelector("select").disabled = blockedParam;
      screen.querySelector("input[type=text]").disabled = blockedParam;
    });
    //блокируем или разблокируем раздел services
    const blSevices = document.querySelectorAll("input[type=checkbox]");
    blSevices.forEach((service) => {
      service.disabled = blockedParam;
    });
    //блокируем добавление новых экранов
    if (blockedParam === true) {
      //блокируем кнопку рассчитать и показываем reset
      buttonPlus.disabled = "true";
      buttonPlus.removeEventListener("click", () => {
        this.addScreensBlock();
      });
      startBtn.style.display = "none";
      resetBtn.style.display = "";
    } else {
      buttonPlus.disabled = "";
      buttonPlus.addEventListener("click", () => {
        this.addScreensBlock();
      });
      //разблокируем кнопку рассчитать и скрываем reset
      startBtn.style.display = "";
      resetBtn.style.display = "none";
    }
    //блокируем поля блока выбора cms
    document.querySelector("#cms-select").disabled = blockedParam;
    document.querySelector("#cms-other-input").disabled = blockedParam;
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
      console.log(this);
      startBtn.disabled = "";
      startBtn.addEventListener("click", () => {
        this.start();
      });
      console.log("рассчитываем");
    } else {
      console.log(this);
      startBtn.disabled = "true";
      startBtn.removeEventListener("click", () => {
        this.start();
      });
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
      console.log("servicePricesPercent " + this.servicePricesPercent);
      this.servicePricesPercent +=
        this.screenPrice * (this.servicesPercent[key] / 100);
    }

    this.fullPrice =
      +this.screenPrice +
      this.servicePricesNumber +
      this.servicePricesPercent +
      this.cmsPercent * this.screenPrice;

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
    console.log("allServicePrices", this.fullPrice);
    console.log(this.servicePercentPrice);
    console.log(this.screens);

    console.log(this.services);
    console.log(this.screenPrice);
    // for (let key in this) {
    //   console.log(this[key]);
    // }
  },
};

// const isNumber = function (num) {
//   return !isNaN(parseFloat(num)) && isFinite(num);
// };

appData.init();
