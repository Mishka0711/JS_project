function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// строка с названием проекта
let title = "JS_project";
console.log("type title: ", typeof title);

//строка с названиями типов экранов через запятую
let screens = "Простые, Сложные, Интерактивные";
console.log("length screens: ", screens.length);
screens = screens.toLowerCase();
console.log("прописное screens: ", screens);
console.log("массив screens: ", screens.split(", "));

//любое число (сколько хотите заработать),
fullPrice = 333333;
console.log("type fullPrice: ", typeof fullPrice);
console.log(
  "Стоимость разработки сайта (" + fullPrice + ") рублей/ долларов/гривен/юани"
);

//любое число
// let screenPrice = Math.random();
let screenPrice = getRandomInt(-1000000, 10000000);
console.log(screenPrice);
console.log(
  "Стоимость верстки экранов (" + screenPrice + ") рублей/ долларов/гривен/юани"
);

//любое число от 1 до 100
let rollback = getRandomInt(0, 100);
console.log("рандомно от 0 до 100: ", rollback);
console.log(
  "Вознаграждение посреднику (" +
    Math.round(fullPrice * (rollback / 100)) +
    ") рублей/ долларов/гривен/юани"
);
//булевое значение
adaptive = getRandomInt(0, 1);
if (getRandomInt(0, 1) == 1) {
  adaptive = true;
} else {
  adaptive = false;
}
console.log("adaptive: ", typeof adaptive);
