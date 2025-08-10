// ============================================================================
// 📘 РОЗДІЛ 1: Теорія API та види API
// ============================================================================

// API (Application Programming Interface — інтерфейс програмування додатків) —
// це набір правил і методів, з допомогою яких одна програма може взаємодіяти з іншою.

// 👉 Приклад:
// У тебе є додаток-погода. Він не збирає дані сам, а звертається до API погодного сервісу
// і отримує дані (температуру, вологість тощо). Ти, як розробник, можеш використати цей API,
// щоб вбудувати погоду у свій додаток.

// REST API — це один з видів API, оснований на принципах REST (Representational State Transfer).
// Найчастіше працює через HTTP і дозволяє клієнтам (браузеру, мобільному застосунку)
// відправляти HTTP-запити (GET, POST, PUT, DELETE) та отримувати дані у форматі JSON або XML.

// 🔹 Основні види API:
// 1. REST API — простий і зрозумілий (GitHub API, Telegram Bot API)
// 2. SOAP API — строгий стандарт, XML, WSDL (старі банківські сервіси)
// 3. GraphQL API — один endpoint, клієнт сам вибирає поля (Facebook)
// 4. WebSocket API — постійне двостороннє з'єднання (чати, ігри, біржі)
// 5. gRPC — швидкий, protobuf, часто для мікросервісів
// 6. SDK/API через бібліотеки — наприклад, DOM API, Java API, Python Pandas API
// 7. Операційні системні API — Windows API, POSIX API

// Middleware — проміжні функції, що виконуються між запитом та відповіддю сервера.
// Приклади: логування, обробка помилок, автентифікація, CORS.


// ============================================================================
// 🛠 РОЗДІЛ 2: Налаштування Express та middleware
// ============================================================================

// Проміжне програмне забезпечення (middleware):
// Middleware — це функції, які виконуються під час обробки запиту до сервера, але перед тим, як буде відправлена відповідь.
import express from "express";
import moment from "moment"; // Бібліотека Moment.js для роботи з датами але вона трози застаріла і краще використовувати date-fns або luxon
const app = express();
// Наприклад, ми можемо використовувати middleware для логування запитів, обробки помилок або автентифікації користувачів.
app.use(async(req, res, next) => {   // next() — це функція, яка передає управління наступному middleware або обробнику маршруту. Якщо не буде next(), запит "зависне", тобто сервер виконає цей запит і зупинииься, а до свого маршпктк який потрібно не дійде.
  
    // Тут можна додати логіку, наприклад, логування запитів
    const { method, url } = req;
    console.log(`Запит: ${req.method} ${req.url}`);
    const date = moment().format("YYYY-MM-DD HH:mm:ss"); // moment() походить з бібліотеки Moment.js — це популярна бібліотека JavaScript для роботи з датами та часом. moment() — це функція, яка створює об'єкт дати/часу. Вона дозволяє легко: отримувати поточну дату й час; парсити строки у форматі дати; форматувати дату в зручний вигляд; додавати/віднімати дні, місяці, роки тощо.
    try {
        await fs.appendFile("./public/logs.txt", `${date} - ${method} ${url}\n`); // fs.appendFile — це функція з модуля fs (file system), яка додає текст до файлу. Якщо файл не існує, він буде створений. У нашому випадку ми записуємо дату, метод запиту та URL у файл logs.txt.
    } catch (error) {
        console.error("Помилка запису в лог:", error);
    }
    next();
}); // - Логування HTTP-запитів — це одна з основ системного моніторингу та діагностики. Ось основні причини, чому це роблять:
// ✅ 1. Виявлення помилок
//       Якщо користувач повідомляє про проблему, ти можеш: переглянути лог, побачити, які запити надходили,які саме відповіді віддавав сервер, і зрозуміти, що пішло не так.
// ✅ 2. Аналіз безпеки
//       Логи можуть показати: підозрілі спроби доступу (наприклад, підбір пароля), атаки типу SQL injection, або DDOS-подібну активність. Це дає можливість вчасно зреагувати!
// ✅ 3. Аналітика та статистика
//       Можна аналізувати: які маршрути найпопулярніші, з яких IP-адрес найчастіше звертаються, в які години сервер найбільш навантажений.
// ✅ 4. Історія дій
//       Лог — це як чорна скринька. Якщо щось зламалось або сервер впав, можна дізнатись, що відбувалось до цього.
// ✅ 5. Законодавчі вимоги
//       У деяких країнах чи сферах (наприклад, банкінг, охорона здоров’я) вимоги безпеки зобов’язують вести логи для перевірок та аудитів.
// 🛠️ Логують у Node.js / Express зазвичай використовують бібліотеки:
// [`morgan`](https://www.npmjs.com/package/morgan) — для простого логування HTTP-запитів,
// [`winston`](https://www.npmjs.com/package/winston) — для гнучкого логування у файл або базу. 

// Краще зберігати логи в окремій директорії, наприклад:
// /logs/logs.txt І додати цю директорію в .gitignore.
// Логувати можна різні дані з запиту та відповіді, наприклад:
//   req.ip — IP клієнта
//   req.headers['user-agent'] — тип браузера
//   статус відповіді (res.statusCode) — але його треба ловити після відправки відповіді, для цього треба додати обробник res.on('finish', ...)


// Обробимо помилку 404, якщо користувач звертається до неіснуючого маршруту за допомогою middleware:
app.use((req, res) => {
    res.status(404).send("<h1>404 - Сторінку не знайдено!</h1>");
});
// або можна зробити так:
app.use((req, res) => {
    res.status(404).json({
        error: "Сторінку не знайдено!",
        status: 404,
        message: "Сторінка, яку ви шукаєте, не існує."
    });
});

// Ще за допомогою middleware можна обробляти помилки CORS (Cross-Origin Resource Sharing), тобто дозволяти запити з інших доменів. Це важливо, якщо твій фронтенд і бекенд розміщені на різних доменах або портах. Наприклад, якщо фронтенд на localhost:3000, а бекенд на localhost:5000, то браузер може блокувати запити через політику безпеки. Щоб цього уникнути, можна використовувати middleware для налаштування CORS:
const cors = require ("cors"); // npm i cors
app.use(cors({
    origin: "http://localhost:3000", // Дозволяємо запити тільки з цього домену
    methods: ["GET", "POST", "PUT", "DELETE"], // Дозволяємо ці методи
    credentials: true // Дозволяємо передачу куків
})); // Це дозволить твоєму фронтенду на localhost:3000 робити запити до бекенду на localhost:5000 без помилок CORS.
// або якщо я хочу дозволити запити з усіх доменів, можна зробити так:
app.use(cors({
    origin: "*", // Дозволяємо запити з усіх доменів
    methods: ["GET", "POST", "PUT", "DELETE"], // Дозволяємо ці методи
    credentials: true // Дозволяємо передачу куків
}));
// або так:
app.use(cors()); // Це дозволить запити з усіх доменів і всіх методів. Але це не рекомендується робити в продакшн, бо може бути небезпечно. Краще вказувати конкретні домени, з яких дозволені запити.



// Не зручно робити всі запити в app.js, тому створюємо окремий файл для роботи з REST API, наприклад, routes/api/books.js (для кожного ресурсу можна створити окремий файл, наприклад, books.js, users.js і т.д.).
// routes/api/books.js
const express = require("express");
const router = express.Router(); // app - використовуеться тільки для запуску основного серверу, а якзщо ми хочемо створити окремий роутер для роботи з API, то використовуємо express.Router().
const books = require("../../data/books.json"); // Припустимо, що у нас є файл books.json з даними книг.
router.get("/", (req, res) => { // Отримання всіх книг
    res.json(books); // Відправляємо масив книг у форматі JSON
});
router.get("/:id", (req, res) => { // Отримання книги за ID
    req.json(books[0]); // Отримуємо ID книги з параметрів URL
});

module.exports = router; // Експортуємо роутер, щоб його можна було використовувати в інших файлах.

// app.js
import express from "express";
const cors = require("cors");
import booksRouter from "./routes/api/books.js"; // Імпортуємо роутер для роботи з книгами
// const app = express();
app.use(cors()); // Додаємо CORS, щоб дозволити запити з інших доменів
app.use(express.json()); // Додаємо middleware для обробки JSON-т bodies запит
app.use("/api/books", booksRouter); // Якщо запит до API починалися з /api/books, то то відповідь шукай в booksRouter, тобто в routes/api/books.js
app.use((req, res) => { // Якщо не знайдено жодного маршруту, то відправляємо 404
    res.status(404).json({ message: "Not Found" });
});
// Запускаємо сервер на порту 3000
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});


// ============================================================================
// 📂 РОЗДІЛ 3: CRUD приклади з JSON
// ============================================================================

// методи HTTP для REST API:

// req.params - містить параметри маршруту, вказані в URL. Використовується при маршрутах з плейсхолдерами, 
// Наприклад: GET http://localhost:3000/users/123
app.get("/users/:id", (req, res) => {
    console.log(req.params.id); // Отримаємо "123" при запиті /users/123
});
// або  GET http://localhost:3000/users/123/lovelyType
app.get("/users/:id/:type", (req, res) => {
    console.log(req.params); // Отримаємо {id: "123", type: "lovelyType"}
    console.log(req.params.id); // Отримаємо "123"
    console.log(req.params.type); // Отримаємо "loveluType"
});


// req.query - містить query-параметри — частина URL після знака ? Працює на всіх маршрутах, не вимагає спеціальних плейсхолдерів
// Наприклад: GET http://localhost:3000/users?id=123
app.get("/", (req, res) => {
    console.log(req.query.id); // отримаємо "123"
});

//req.body - містить тіло запиту (зазвичай для POST, PUT, PATCH запитів). Потребує middleware, наприклад express.json()
// Приклад:
app.post("/users", (req, res) => {
    console.log(req.body); // Отримаємо тіло запиту, наприклад: { name: "Alice" }
});

// req.headers - містить заголовки запиту (наприклад, Authorization, Content-Type і т.д.)
app.get("/check", (req, res) => {
    console.log(req.headers['authorization']);
});

// req.method - містить HTTP-метод запиту (GET, POST, PUT, DELETE і т.д.)
app.get("/method", (req, res) => {
    console.log(req.method); // Отримаємо "GET" при запиті /method
});

// 1. GET — отримання даних (наприклад, список книг або контактів)
const getAllContacts = async () => {
  try {
    const contactsPath = path.resolve("contacts.json");
    const data = await fs.readFile(contactsPath, "utf-8"); // читаємо файл як текст
    return JSON.parse(data); // перетворюємо JSON-текст у масив об’єктів
  } catch (error) {
    console.log("Помилка при отриманні списку контактів:", error.message);
  }
};

// 2. GET - Отримати контакт по ID
const getContactById = async (contactId) => {
  try {
    const contacts = await getAllContacts();
    return contacts.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    console.log("Помилка при пошуку контакта:", error.message);
  }
};

// 3. POST - Додати новий контакт
// Joi-схема для валідації введених даних
const contactAddSchema = Joi.object({
  name: Joi.string().min(3).required(), // ім’я — мінімум 3 символи
  email: Joi.string()
    .email({ tlds: { allow: false } }) // формат email
    .required(),
  phone: Joi.string()
    .pattern(/^\+?[0-9]{7,15}$/) // номер від 7 до 15 цифр, може починатися з "+"
    .required(),
});

const addContact = async (body) => {
  try {
    // Перевірка даних
    const { error } = contactAddSchema.validate(body, { abortEarly: false });
    if (error) {
      throw new Error("Помилка валідації: " + error.message);
    }

    const contacts = await getAllContacts();
    const newContact = { id: nanoid(), ...body };

    contacts.push(newContact); // додаємо у масив
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact;
  } catch (error) {
    console.log("Помилка при додаванні контакта:", error.message);
  }
};

// 4. PUT - Оновити існуючий контакт
// =============================
const updateContact = async (id, body) => {
  try {
    // Перевірка даних
    const { error } = contactAddSchema.validate(body, { abortEarly: false });
    if (error) {
      throw new Error("Помилка валідації: " + error.message);
    }

    const contacts = await getAllContacts();
    const index = contacts.findIndex((item) => item.id === id);

    if (index === -1) {
      return null; // якщо не знайдено
    }

    contacts[index] = { id, ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return contacts[index];
  } catch (error) {
    console.log("Помилка при оновленні контакта:", error.message);
  }
};

// 5. DELETE - Видалити контакт
const removeContact = async (id) => {
  try {
    const contacts = await getAllContacts();
    const index = contacts.findIndex((item) => item.id === id);

    if (index === -1) {
      return null; // якщо не знайдено
    }

    const removedContact = contacts.splice(index, 1)[0];
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return removedContact;
  } catch (error) {
    console.log("Помилка при видаленні контакта:", error.message);
  }
};

// ============================================================================
// 🔹 HttpError helper
// ============================================================================
const HttpError = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
};

// ============================================================================
// 🔹 Приклади використання (можна закоментувати під час запуску сервера)
// ============================================================================
// (async () => {
//   console.log(await getAllContacts());
//   console.log(await getContactById("AeHIrLTr6JkxGE6SN-0Rw"));
//   console.log(await addContact({ name: "Ivan Petrov", email: "ivan@gmail.com", phone: "+380671234567" }));
//   console.log(await updateContact("AeHIrLTr6JkxGE6SN-0Rw", { name: "Updated Name", email: "new@mail.com", phone: "+380671234568" }));
//   console.log(await removeContact("AeHIrLTr6JkxGE6SN-0Rw"));
// })();