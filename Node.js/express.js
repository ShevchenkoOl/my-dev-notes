// Express — це популярний фреймворк для Node.js, який спрощує створення веб-серверів та API.
// Навіщо потрібен Express:
//  1. Обробка HTTP-запитів
//      - Express дозволяє легко обробляти запити GET, POST, PUT, DELETE тощо.
//  2. Створення маршрутів (routes)
//      - Дає можливість задавати URL-адреси та дії, які виконуються при зверненні до них.
//  3. Підключення middleware
//      - Дає змогу використовувати сторонні або власні функції для обробки запитів (наприклад, логування, авторизація, обробка JSON).
//  4. Робота з API
//      - Express часто використовують для створення REST API — бекенду, до якого звертаються фронтенд-додатки або мобільні застосунки.
//  5. Сервірування статичних файлів
//      - Можна легко віддавати HTML, CSS, JS, зображення тощо.

// Встановлення: npm i express
// импортуємо: import express from "express";
// і викликаємо його як функцію: console.log(express());
// можна оголосити в нову зміну: const app = express(); - тепер наш app буде web-server
// для того щоб наш веб-сервер працював його треба запустити: app.listen(3000); - 3000 - порт на якому запускаємо скрвер, він може бути будь-який
// Для акпквірки чи скрвер працює, другим аргументом ми можемо передати колбек фенкцію:
// app.listen(3000, ()=> console.log("Server running on http://localhost:3000")); -після чого запкускаємо весь проект


// Робота з запитами на сервер:
// app.get("/", (request, response)=>{   // метод Express, який створює обробник запитів типу GET (наприклад, коли користувач просто відкриває сторінку в браузері).
//     console.log(request.url);           // /
//     console.log(request.method);        // GET
//     response.send("<h1>Home Page!</h1>") // Відправляє відповідь користувачеві, тобто при запуску серверу на порті 3000, і за адресою: / - на фронтенд ми передаєм Home Page!
// })


// або варіант з рендкрінгом сторвнки:
// app.get("/books", async (req, res) => {
//   const data = await readFile("./books.json", "utf-8");
//   const books = JSON.parse(data);          // JSON.parse(data) — перетворює текст JSON (рядок) у справжній JavaScript-об’єкт або масив.
//                                               В нашому випадку — books буде масивом об'єктів з полями title і description.
//   const html = books.map(book => `
//       <h1>${book.title}</h1>
//       <span>${book.description}</span>
//     `).join("");                        // .join("") — об’єднує всі ці HTML-блоки в один великий HTML-рядок (без ком).
//                                            Результат — змінна html містить всю HTML-розмітку, яку ми хочемо відправити в браузер.
//   res.send(html);         // див methods.js
// });

// якщо нам потрыбно обробити якусб помилку http-запиту, то ми її обробляжмо в самому кінці:
app.use((req, res) => {
  res.status(404).send("<h1>404 — Страница не найдена</h1>");
});

// або більш професфйно:
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    path: req.originalUrl
  });
});

// Основные методы:
      // - get	получить данные
      // - post	создать
      // - put	заменить
      // - patch	изменить
      // - delete	удалить
      // - use	middleware / 404 / ошибки / парсинг JSON:
                // 1. middleware (промежуточная функция) - которая вклинивается между запросом и ответом. (req, res, next) => { ... }
                //           req — информация о запросе
                //           res — ответ
                //           next — очень важная команда "передай управление дальше", Если не вызвать next(): запрос зависнет, браузер будет ждать ответа бесконечно, маршруты (app.get) не выполнятся. Сиатавить по верз всех запросов. next() можна не использовать когда, мы отправляем ответ:
                        app.use((req, res) => {
                          res.send("Доступ запрещён");
                        });
                // 2. логирование: 
                app.use((req, res, next) => {
                          console.log(req.method, req.url);
                          next();
                        });
                // 3. обработка ошибок:
                app.use((req, res) => {
                      res.status(404).send("Not found");
                      });
                // 4. Парсинг JSON:
                app.use(express.json());
  

// Якщо нам потрібно взяти динамічну частину URL, http://localhost:3000/user/Alex, :name - rout (URL) paramentr, параметр маршруту, наприклад ім'я Alex - використовуемо метод req.params: 
app.get("/user/:name", (req, res) => {
    const userName = req.params.name;
 res.send(`<h1>Привет, ${userName}!</h1>`) // Привет Alex!
 console.log(req.params); // [Object: null prototype] { name: 'Alex' }
});



// Middleware — это функции, которые выполняются ДО того, как запрос попадет в твой app.get
// Створимо простішу функцію logger, яка буде відслідковувати час і метод запиту:
const logger = (req, res, next) => {
  console.log(`В ${new Date().toLocaleString()} спрацював метод запиту: ${req.method} на ${req.url}`);
  next(); // - обовязково, оскільки без next сервер зависне і код не виконажться далі
}

app.use(logger); // підключаємо, в самому вверху кода перед усіма запитами


// використання статичних файлів, без get-запитів. Файли зберігаємо в корні нашого проекта в папці public, за допомогою команди app.use() підключажмо папку:
app.use(express.static("public"));
//тепер вводим адресу: http://localhost:3000/new2026.png (new2026.png - це картинка яка зберігається в папці public), і вона відобразиться в браузері без get-запита.

app.use(express.json()) //дозволити читати json з тіла запиту req.body

// Пошук товарів з файла json:
const products = [
    { id: 1, name: "Ноутбук", price: 50000 },
    { id: 2, name: "Смартфон", price: 30000 },
    { id: 3, name: "Наушники", price: 5000 }
];

app.get("/products", (req, res) => {
    res.json(products) // виводимо всы товару в браузер в форматі json
})

// шукаємо товари по id і якшо є виводимо результат на сторінку 
app.get("/products/:id", (req, res) => {
    const productId = req.params.id;
    const product = products.find(p => +productId === p.id);
    if(product){
        res.send( `<h1>${product.name} - ${product.price} крон</h1>`);
    } else {
        res.send("<h1>Товар не найден</h1>")
    }
});

// додаєм товар з використанням методу POST, але с самого початку нам потрыбно добавити middleware для того щоб дозволити читати json з тіла запиту: app.use(express.json()) - в верху коду перед всіма запитами

app.post("/products", (req, res)=>{
    // Данные от пользователя лежат в req.body
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});