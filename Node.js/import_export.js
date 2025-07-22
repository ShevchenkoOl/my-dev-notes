//--------------------ES-модули (ES Modules, или просто import/export) - це є новіший спосіб
// package.json
// додаємо в першому блоці ОБОВ'ЯЗКОВО!!!!!!!!!!!!!!!
// "type": "module"

// users.js
export const users = ['Alex', 'Maria']; // іменований експорт

// або
export {
  getAllContacts,
  addContact
};

// або
export default { //Экспорт по умолчанию (если хочешь экспортировать всё как один объект):
  getAllContacts,
  addContact
};  


// index.js
import { users, getAllContacts} from './users.js';
import books from "./books.json" assert { type: "json" }; // але звлежить від версії node новіші версії не дуже коректно з ним працюють
// якщо ми імпортували я к один об'єкт (export default)
import contacts from './contacts.js';

contacts.getAllContacts();
contacts.addContact();


// Для вбудованих модулів:
import fs from 'fs';
import path from 'path'; 

// Коли ми працбємо з імпортом json файлів, може бути різного роду помилки через версії node.js, тоді краще зчитувати інформацію з нього через:
const fs = require("fs/promises");

app.get("/books", async (req, res) => {
  const data = await readFile("./books.json", "utf-8");
  const books = JSON.parse(data);
  const html = books.map(book => `
      <h1>${book.title}</h1>
      <span>${book.description}</span>
    `).join("");
  res.send(html);
});





//--------------------CommonJS більш старіший спосіб імрорту/експорту
// "type": "module" удаляємо з package.json!!!!!!!!!!!!!!!

// Цей вид експорту-імпорту називаеться CommonJS 
// При експорті:
const admins = ["Alex", "Tanja", "Denis"];
const clients = ["Oleg", "Honza", "Marianna", "Jakub"];

const users = {admins, clients};
module.exports = users;

//якщо нам потрібно експортувати декілька елементів то ми їх екаортуємо як обьєкт:
module.exports = {
    admins,
    clients
}



// При імпорті:
const books = require("./books.json"); // звичайний json
const nodemon = require('nodemon'); // якщо ми імпортуємо з пакетів, просто вказуєм назву пакетв
const obj = require("./index2"); // вказуєм назву файла звідки імпортуємо, назву зсінної можна поміняти (ексаортували users а полуличи obj)
// або можемо зробити при імпорті дистроктуризацію, тобто взяти щось одне:
const {admins} = require("./index2");
// в адресі імпорту можна вказати папку без файла, тоді node.js сам автоматично буде робити імпорт з файлу index.js, який знаходиться в цій папці що ми указали.

const getYear = require("./index2").getCurrencyYear(); // якщо ми експортували функцію, то при імпорті ми відразу можемо її викликати (отримаьт результат)