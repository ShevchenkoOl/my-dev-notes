// создание локального сервера с использованием встроеного http- модуля c помощью чистого Node.js
const http = require('http'); // импортируем модуль
const port = "3000";

const server = http.createServer((req, res)=>{ // Создание сервера
    res.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"}); // // Говорим браузеру, что всё ок, в разделе Headers (Заголовки) ты увидишь:
            // Status Code: 200 OK
            // Content-Type: text/plain
    res.end(`<h1>Hello Node.js!</h1>`); // Отправляем текст и закрываем соединение, 
    // этот текст будет отображаться в браузере. если text/plain - обычный текст;
    // texthtml - html;
    // application/json - JSON;
    // text/css - CSS;
    // application/javascript - JS.                                            
})


// якщо нам потрібно вразувати умови відповіді, наприклад якщо адресса закінс=чужться / то це головна стрінка, якщо на /about - то це секція about
// const server = http.createServer((req, res)=>{
     
//     if(req.url === "/"){
//         res.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"});
//         res.end(`<h1>Это главная страница!</h1>`)
//     } else if(req.url === "/about"){
//         res.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"});
//         res.end(`<h1>Это секция about</h1>`)
//     } else { 
//         res.writeHead(404, {"Content-Type": "text/html; charset=UTF-8"})
//         res.end(`<h1>Страница не найдена!</h1>`)}                                      
// })

// з використанням чистого Node.js метод res.writeHead вищивається тільки один раз, тому його варто обертути в блок if(), в іншому випадку видасть помилку: ERR_HTTP_HEADERS_SENT

server.listen(port, ()=>{
    console.log(`server running on http://localhost:${port}/`);
})

// Чистый Node.js VS Express
//  - res.set("Content-Type", "text/plain; charset=utf-8"); - в Node.js - обезательно, в Express - поставляеться автоматически