// API (Application Programming Interface — інтерфейс програмування додаток) — це набір правил і методів, з допомогою яких одна програма може взаємодіяти з іншою.
// 👉 Приклад:
//            - У тебе є додаток-погода. Він не збирає дані сам, а звертається до API погодного сервісу і отримує дані (температуру, вологість тощо). Ти, як розробник, можеш використовувати цей API, щоб вбудувати погоду в своє додаток.

// REST API — це один з видів API, оснований на принципах REST (Representational State Transfer). Він частіше за все працює через HTTP (як звичайні сайти). або це набір правил або методів, що дають змогу клієнтам (наприклад, браузеру або мобільному застосунку) відправляти HTTP-запити (GET, POST, PUT, DELETE) до сервера та отримувати дані у форматі JSON або XML.

// Загальні види API:
// 🔹 1. REST API: Основан на HTTP і принципах REST, Частіше за все використовується у веб-розробці, Простий і зрозумілий. Приклади: GitHub API, Telegram Bot API

// 🔹 2. SOAP API (Simple Object Access Protocol): Більш строгий стандарт порівняно з REST, // Використовує XML для обміну даними, Вимагає WSDL (опису структури). Приклади: старі банківські і корпоративні сервіси - 🛠️ Використовується, коли важливі безпека і стандартизація

// 🔹 3. GraphQL API: Розроблений Facebook як альтернатива REST, Клієнт сам вибирає, які поля отримати, Один endpoint замість багатьох, Дані приходять у форматі JSON. Перевага: менше даних передається, гнучкіше для фронтенда

// 🔹 4. WebSocket API: Постійне двостороннє з'єднання між клієнтом і сервером, Використовується для реального часу: чати, ігри, біржі, Працює поверх TCP, а не як звичайні HTTP-запити

// 🔹 5. gRPC (Google Remote Procedure Call): Розроблений Google, Використовує protobuf (а не JSON або XML), Дуже швидкий, підходить для мікросервісів. Часто використовується всередині великих backend-систем

// 🔹 6. SDK/API через бібліотеки: Це може бути API всередині програми або фреймворка, доступний через код. Приклади: DOM API в браузері, Java API (наприклад, File, Scanner), Python API бібліотеки Pandas, Tkinter

// 🔹 7. Операційні системні API: Це інтерфейси, через які програми спілкуються з операційною системою. Приклади: Windows API, POSIX API (для Unix-подібних систем)


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


// методи HTTP для REST API:
// 1. GET — отримання даних (наприклад, список книг)
router.get("/", async (req, res) => {
    try {
        const data = await readFile("./books.json", "utf-8");
        const books = JSON.parse(data); // Перетворюємо текст JSON у масив об'єктів
        res.json(books); // Відправляємо масив книг у форматі JSON
    } catch (error) {
        return res.status(500).json({ message: "Помилка сервера" }); // Якщо сталася помилка, відправляємо 500
    }
});

// отримання книги за ID
router.get("/:id", async (req, res) => {
    try {
        const data = await readFile("./books.json", "utf-8");
        const books = JSON.parse(data);
        const book = books.find(b => b.id === parseInt(req.params.id));
        if (!book) {
            throw HttpError(404, `Книга з ID ${req.params.id} не знайдена`); // Використовуємо функцію HttpError для створення помилки. req.params - це об'єкт, який містить параметри маршруту, в данному випадку це ID книги, яку ми шукаємо.
            // або можна зробити так:
            // const error = new Error("Книга не знайдена");
            // error.status = 404; // Встановлюємо статус 404, якщо книга не знайдена
            // throw error; // Генеруємо помилку, щоб передати її далі в middleware обробки помилок
        } // цю перевіоку ми можкмо винести в окремий файл helper.js (дивись нижче), щоб не дублювати код в кожному роуті
        res.json(book);
    } catch (error) {
        // return res.status(500).json({ message: "Помилка сервера" }); // замість оброблення помилки ми можем в нашому get запиті передати третій параметр next і тут викликати next з параметром error 
        next(error); // next(error) - шукає обробник помилок, який має чотири параметри (err, req, res, next). Якщо такий обробник знайдеться, то він буде викликаний з переданою помилкою. Якщо ні, то Express віддасть стандартну помилку 500. 
    }
});

// 2. POST — створення нових даних (наприклад, додавання нової книги)
app.use(express.json()); // Додаємо middleware для обробки JSON-т bodies запитів
// Це дозволяє нам отримувати дані з тіла запиту (req.body), якщо не буже цбого middleware, то req.body буде undefined і ми не зможемо отримати дані з тіла запиту.

//Для того щоб перевірити чи в правильному форматі нам прийшли дані використаємо біьліотеку Joi, яка дозволяє створювати схеми валідації для об'єктів. Вона допомагає перевіряти, чи дані відповідають очікуваному формату, і видає помилки, якщо щось не так.
// import Joi = require("joi"); // npm i joi
const bookAddSchema = Joi.object({ // Створюємо схему валідації для нової книги
    title: Joi.string().min(3).required(), // Назва книги має бути рядком, мінімум 3 символи, обов'язкове поле
    author: Joi.string().required(), // Автор має бути рядком, мінімум 3 символи, обов'язкове поле
    year: Joi.number().min(1000).max(9999).required() // Рік має бути числом, в діапазоні від 1000 до 9999, обов'язкове поле
});
router.post("/", async (req, res, next) => {
    try {
        const { error } = bookAddSchema.validate(req.body); // Валідація даних з тіла запиту
        if(error) {
            throw HttpError(400, error.message); // Якщо дані не відповідають схемі, кидаємо помилку 400 (Bad Request)
        }
        // console.log(req.body); // req.body містить дані, які були надіслані в тілі запиту (наприклад, при створенні нової книги)`);
        const newBook = await readFile("./books.json", "utf-8");
        const books = JSON.parse(newBook); // Перетворюємо текст JSON у масив об'єктів
        const book = {
            id: books.length + 1,
            title: req.body.title,
            author: req.body.author,
            year: req.body.year
        };
        books.push(book);
        await writeFile("./books.json", JSON.stringify(books, null, 2));
        res.status(201).json(book); // передаєм на сервер стутус 201 (Created) і відправляємо створену книгу у форматі JSON
    } catch (error) {
        next(error); // Передаємо помилку далі в middleware обробки помилок
    }
})

// 3. PUT — оновлення існуючих даних (наприклад, зміна інформації про книгу)
router.put("/:id", async (req, res, next) => {
    try {
       const { error } = bookAddSchema.validate(req.body);
        if(error) {
            throw HttpError(400, error.message);
        }
        const { id } = req.params; // Отримуємо ID книги з параметрів URL
        const data = await readFile("./books.json", "utf-8");
        const books = JSON.parse(data);
        const bookIndex = books.findIndex(b => b.id === parseInt(id)); // З
        }
    catch (error) {
        next(error); // Передаємо помилку далі в middleware обробки помилок
    }
});

// 4. DELETE — видалення даних (наприклад, видалення книги) 
router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params; // Отримуємо ID книги з параметрів URL
        const data = await readFile("./books.json", "utf-8");
        const books = JSON.parse(data);
        const bookIndex = books.findIndex(b => b.id === parseInt(id));
        if (bookIndex === -1) {
            throw HttpError(404, `Книга з ID ${id} не знайдена`);
        }
        books.splice(bookIndex, 1); // Видаляємо книгу з масиву
        await writeFile("./books.json", JSON.stringify(books, null, 2));
        res.status(204).send(); // Відправляємо статус 204 (No Content) без тіла відповіді
        res.json({ message: "Книга видалена" }); // Або можна відправити повідомлення про успішне видалення        
    } catch (error) {
        next(error);
    }
});


// helper/ HttpError.js
const HttpError = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
};
