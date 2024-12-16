// шпаргалка для быстрого доступа

console.log(5 + "5"); //55 str тк + указывает на сложение строк
//numb - * / явные числовые операции если не выйдет то NaN
console.log(5 - "5");
console.log(5 * "5"); //numb
console.log(5 / "5"); //numb

console.log(5 == "5"); //True нестрогое, пытается свести типы данных
console.log(5 === "5"); //False строгое, + сравнивает типы данных

console.log(String(true)); //текст True
console.log(String(undefined)); //текст undefined
console.log(String(null)); //текст null
console.log(String("123")); //текст 123
console.log(String(123)); //текст 123

console.log(Number(true)); //1
console.log(Number(false)); //0
console.log(Number(undefined)); //NaN
console.log(Number(null)); //0
console.log(Number("123")); //123
console.log(Number("123sgerg")); //NaN
console.log(Number(123)); //123

console.log(Boolean("")); //false
console.log(Boolean(null)); //false
console.log(Boolean(undefined)); //false
console.log(Boolean(NaN)); //false
console.log(Boolean(false)); //false

//все что есть в скобках даже пробел как что-то то есть существует
console.log(Boolean("")); //true

console.log(!!"5"); //перевод в булеан

console.log(10 + ""); //перевод числа в строку
//console.log(10 .toString()); //перевод числа в строку
//console.log(a.toString()); //перевод числа в строку

console.log(+"10"); //перевод числа в строку
console.log(+"10sss"); //перевод числа в строку закончится NaN

//2 метод
let str = prompt("Сколько вам лет?", "18 лет");
let result = str + 10; //1810 тк + читается как слож строк
console.log(result); //null при отмене
let str2 = +prompt("Сколько вам лет?", "18 лет");
let result2 = str2 + 10; //28 но если неформат то будет NaN

console.log(parseInt(str2));
//354sds > 354   354sds444 > 354
//sds444 > Nan  sdsergerg > Nan

console.log(parseFloat(str2)); //аналогично для дробных чисел

console.log(parseInt("10ff", 2)); //перевод в двоичную СС
console.log(parseInt("10ff", 16)); //перевод в шеснадцатеричную СС

if (true) console.log("истина");
if (false) console.log("ложь"); //не будет выполнено
if (true) {
  console.log("истина");
} else {
  console.log("ложь");
}
let m = 11;
if (m == 11) {
  console.log("11");
} else if (m == 12) {
  console.log("12");
} else {
  console.log("other");
}

switch (m) {
  case 11:
    console.log("11");
    break;
  case 12:
    console.log("12");
    break; //остановка работы блока
  default:
    console.log("other");
}

//группировка кейсов:

switch (m) {
  case 11:
  case 12:
    console.log("11-12");
    break; //остановка работы блока
  default:
    console.log("other");
}
//обработка результатов ввода
const n = +prompt("Веедите число");
switch (n) {
  case 11:
  case 12:
    console.log("11-12");
    break; //остановка работы блока
  default:
    console.log("other");
}

//switch с лог выражениями
switch (true) {
  case n > 10:
    console.log("10+");
  // break; //остановка работы блока
  case n <= 20:
    console.log("20-");
    break; //остановка работы блока
  default:
    console.log("other");
}
// case 5 < n < 10  работать не будет
// case 5 < n && n < 10  работать будет

//тернарный оператор
let result3 = n === 10 ? 1 : 2;
console.log(result3);

n === 10 ? console.log("верно") : console.log("не верно");
