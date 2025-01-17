"use strict";

const reklama = document.querySelector(".adv");
const book_list = document.querySelector(".books");
const books = document.querySelectorAll(".book");
//удаление рекламы
reklama.remove();
//восстановить порядок книг
book_list.prepend(books[1]);
book_list.append(books[2]);
books[3].before(books[4]);
//заменить фон
document.body.style.backgroundImage = "url(./image/adv.jpg)";
//исправить ошибку в заголовке
books[4].querySelector("h2").textContent = "Книга 3. this и Прототипы Объектов";
books[4].querySelector("h2").style.color = "darkkhaki";

//исправить порядок в глав в 2 и 5 книге
let book_ul = books[0].querySelectorAll("ul");
let book_li = books[0].querySelectorAll("li");

console.log(books[0].querySelector("h2").textContent);
book_ul.forEach((element) => {
  console.log(element.textContent);
});
book_ul[0].append(book_li[3]);
book_ul[0].append(book_li[6]);
book_ul[0].append(book_li[8]);
book_ul[0].append(book_li[4]);
book_ul[0].append(book_li[5]);
book_ul[0].append(book_li[7]);
book_ul[0].append(book_li[9]);
book_ul[0].append(book_li[2]);
book_ul[0].append(book_li[10]);

book_ul = books[5].querySelectorAll("ul");
book_li = books[5].querySelectorAll("li");
console.log(books[5].querySelector("h2").textContent);
book_ul.forEach((element) => {
  console.log(element.textContent);
});
book_ul[0].append(book_li[9]);
book_ul[0].append(book_li[3]);
book_ul[0].append(book_li[4]);
book_ul[0].append(book_li[2]);
book_ul[0].append(book_li[6]);
book_ul[0].append(book_li[7]);
book_ul[0].append(book_li[5]);
book_ul[0].append(book_li[8]);
book_ul[0].append(book_li[10]);

book_ul = books[2].querySelectorAll("ul");
book_li = books[2].querySelectorAll("li");
console.log(books[2].querySelector("h2").textContent);
book_ul.forEach((element) => {
  console.log(element.textContent);
});
//добавить главу в 6ю книгу
const newElem = document.createElement("li");
newElem.textContent = "Глава 8: За пределами ES6";
// console.log(newElem);
book_li[9].before(newElem);
