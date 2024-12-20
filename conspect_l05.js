"use strict";

let potato = 10;
//пример рекурсии но нежелательно использовать
const peelPotato = function (potatoIndex) {
  if (potatoIndex > 0) {
    console.log("Картошка №" + potatoIndex + " почищена");
    potatoIndex--;
    peelPotato(potatoIndex);
  }
};
//peelPotato(potato);

//пример цикла FOR
// for (let potatoIndex = 10; potatoIndex > 0; potatoIndex--) {
//   console.log("Картошка №" + potatoIndex + " почищена в цикле for");
// }
//тоже самое покороче
// for (let i = 10; i > 0; i--) {
//   console.log("Картошка №" + i + " почищена в цикле for");
// }
//наоборот возрастание
//for (let i = 1; i < 11; i++) {
// if (i === 5) continue; //пропуск тела цикла при i=5
//if (i === 5) break; //остановка цикла при i=5
//console.log("Картошка №" + i + " почищена в цикле for");
//}

//но лучше пропускать значения так
for (let i = 1; i < 11; i++) {
  if (i !== 5) {
    console.log("Картошка №" + i + " почищена в цикле for");
  }
}

//пример while
// while (potato > 0) {
//   console.log("Картошка №" + potato + " почищена в цикле while");
//   potato--;
// }

//пример do while который отработает хотя бы 1 раз(постусловие)
// do {
//   console.log("Картошка №" + potato + " почищена в цикле while");
//   potato--;
// } while (potato > 0);
