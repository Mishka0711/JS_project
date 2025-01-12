"use strict";
let name = "Alex";
// let job = new Object(); //это исп крайне редко
// let person = { name: "Alex" };
// let person = { name: name };
// let person = {
//   name: name,
//   // "age-next": 33, //для названия с тире через кавычки
//   age: 33,
// };
// person.age = 33;

// let job = {
//   position: "middle-developer",
// };

let person = {
  name: "Alex",
  age: 33,
  job: {
    position: "middle-developer",
    salary: "1.000.000",
  },
};

// person.job = job;
// person.job.position = "senior-developer";

// console.log(name);
// console.log(person.age);

// const say = function (str) {
//   console.log(str);
// };

// person.say = say;
//можно и так
person.say = function (str) {
  console.log(str);
};

console.log(person["age"]);
// console.log(job);
console.log(person);

person.say("Hello world");

let key = "sity";
let sity = "Minsk";

let array = [1, 2, 3, 4];
array.length = 30;
//способ очистки массива
array.length = 0;
console.log(array);

let array2 = ["Apple", "Orange", "Banana"];
console.log(array2);

//методы меняющие массив
array2.push("Kiwi"); //добавляет в конец
array2.unshift("Papaya", "Mango"); //добавляет в начало
console.log(array2);

array2.pop(); //вырезает элемент массива с конца
array2.shift(); //вырезает 1 элемент с начала
console.log(array2.pop());
let LastElement = array2.pop();
console.log(LastElement);
array2.sort(); //сортировочка массива
array2.reverse(); //реверс массива
console.log(array2);

//метод не меняющий массив
console.log(array2.join()); //возвращает массив как строку, с разделителем по умолчанию
console.log(array2.join(" ")); //возвращает массив как строку, с разделителем в виде пробела
console.log(array2.join(", ")); //возвращает массив как строку, с разделителем в виде пробела с запятой

let obj = {
  name: "Alex",
  age: 23,
  isStudent: false,
};
console.log(obj);
//перебор ключей в обьекте
for (let key in obj) {
  console.log("Ключ:" + key + " " + "Значение:" + obj[key]);
}

console.log(Object.keys(obj));

let array3 = [1, 2, 3, 4, "cat"];
//возвращение ключей массива
for (let key of array3) {
  console.log(key);
}
//возвращение индекса
for (let key in array3) {
  console.log(key);
  //console.log(array3[key]); //снова значения элементов
}

//удаление элемента массива(не лучшее)
console.log(array3);
delete array3[2];
console.log(array3); //остается пустой слот

//удаление элемента обьекта
console.log(obj);
delete obj.age;
console.log(obj);

//псевдомассивы у которых нет методов
const func = function (a, b, c) {
  console.log(arguments); //пример псевдомассива который не стоит применять
  console.log(a + b + c);
};

func(3, 6, 9);

const books = [
  { id: 0, name: "Дорога домой", author: "Виталий Зыков", price: 1200 },
  { id: 1, name: "Война за выживание", author: "Виталий Зыков", price: 1500 },
  {
    id: 2,
    name: "Мир бесчисленных островов",
    author: "Виталий Зыков",
    price: 1300,
  },
  { id: 3, name: "Далекая страна", author: "Алекс Кош", price: 950 },
  { id: 4, name: "Адреналин", author: "Алекс Кош", price: 1650 },
];

//добавление строки в массив
// const newArr = books.concat({
//   id: 5,
//   name: "Школа Пепла ",
//   author: "Виталий Зыков",
//   price: 1980,
// });

//добавление выборочного диапазона из др массива
// const newArr = books.slice(0, 3);  //копирует 0 1 2 но не включая 3
// console.log(newArr);

//универсальный вариант меняющий исходный массив
// const newArr = books.splice(2, 3);
// books.splice(2, 3); //вырежем 3 элемента начиная с 2 (2 3 4)
// books.splice(
//   2,
//   3,
//   {
//     //вырежем и добавим новый элемент, 5й
//     id: 5,
//     name: "Школа Пепла ",
//     author: "Виталий Зыков",
//     price: 1980,
//   },
//   {
//     //вырежем и добавим новый элемент, 5й
//     id: 5,
//     name: "Школа Пепла ",
//     author: "Виталий Зыков",
//     price: 1980,
//   }
// );
// console.log(books);

// const result = books.find(function (item, index, array) {
//   return item.name.toLowerCase() === "война за выживание";
// });
// const result2 = books.find(function (item, index, array) {
//   return item.id === 3;
// });
// // console.log(result2);
// const result3 = books.findIndex(function (item, index, array) {
//   return item.id === 3;
// });
// books.splice(result3, 1);
// console.log(books);

//Перебор каждого элемента массива, меняя исходный массив
// books.forEach(function (item) {
//   item.price = item.price + "rub";
// });
// console.log(books);
//Копирование в новый массив каждого элемента с изменениями
// const newArr = books.map(function (item) {
//   item.price = item.price + "rub";
//   return item;
// });
// console.log(newArr);

//пример для чего нужен map вместо foreach
// const newArr = books.map(function (item) {
//   const newObj = {
//     id: item.id,
//     name: item.name,
//   };
//   return newObj;
// });

//пример filter перенос книг только виталия зыкова полными элементами в новый массив
// const newArr = books.filter(function (item) {
//   return item.author === "Виталий Зыков";
// });

//пример reduce сложение сумм каждого элемента массива
const newArr = books.reduce(function (sum, item) {
  return sum + item.price;
}, 0); //0 = начинаем суммировать с нуля, например для умножения поставить 1
//reduce работает слева направо reduceRight справа налево (имеет значение для умножения)
console.log(newArr);
