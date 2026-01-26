// операции CRUD и запись их результатов в файл

// const express = require("express");  // импорт библиотеки express()
// const fs = require("fs");            // библиотека для рвботы с файлами
// const { nanoid } = require("nanoid"); // библтотека для генерации id

// const port = 3000;
// const app = express();
// let products = [];     // в этот массив мы сохраняем все товары что пришли в результате запроса и с ним же мы будем постоянно работать

// fs.readFile("./db.json", "UTF-8", (error, data) => {
//     if(error){
//         res.status(400).json({message:"Ошибка при чтении файла"})
//     }
//     products = JSON.parse(data);
//     console.log(products);
// });

// app.get("/products", (req, res)=> res.json(products));

// app.get("/products/:id", (req, res) => {
//     const prodID = req.params.id;
//     const findProd = products.find(prod => prodID == prod.id);
//     if(findProd){
//         res.status(201).json(findProd);
//     } else (
//         res.status(400).json({ message: "Товар не найден!" })
//     )
// })

// // В Express по умолчанию тело запроса не парсится. Нужно добавить:
// app.use(express.json()); // используется для подключения промежуточного ПО (middleware) в конвейер обработки запросов, выполняя функции для любого входящего запроса, независимо от HTTP-метода

// app.post("/products", (req, res) => {
//     const newProduct = {
//         id: nanoid(3),
//         name: req.body.name,
//         price: req.body.price
//     };

//     products.push(newProduct);
    
//     fs.writeFile("./db.json", JSON.stringify(products, null, 2), err =>{
//         if(err){
//             res.json({message: "Ошибка при записи файла"})
//         }
//         res.status(201).json({
//         message: "Товар успешно добавлен", 
//         product: newProduct
//     });
//     })
// })

// app.delete("/products/:id", (req, res) => {
//     const delProd = req.params.id;
//     const findIndex = products.find(p => delProd == p.id);
//     if(!findIndex){
//         return  res.status(400).json({message: "Товар не найден"})
//     }
//         products = products.filter(p=> delProd != p.id);

//         fs.writeFile("./db.json", JSON.stringify(products, null, 2), e => {
//             if(e){
//             res.status(500).json({message: "Ошибка при записи файла"})
//         }
//         res.status(201).json({
//         message: "Товар успешно удалён",
//         products: products
//     });
//         });
// })


// // put - полное изменение
// app.put("/products/:id", (req, res)=>{
//     const udateProd = req.params.id;
//     const findIndex = products.findIndex(p => udateProd == p.id);

//     if(findIndex != -1){
//         products[findIndex] = {
//             id: udateProd,
//             ...req.body
//         }
//     fs.writeFile("./db.json", JSON.stringify(products, null, 2), e => {
//             if(e){
//             res.status(500).json({message: "Ошибка при записи файла"})
//         }
//         res.status(201).json({
//         message: "Товар успешно изменён",
//         products: products
//         });
//     });
//     } else {
//         return  res.status(400).json({message: "Товар не найден"})
//     }
// })

// // patch - это частичное изменение файла, например я хочу изменить только цену или название
// app.patch("/products/:id", (req, res)=>{  
//     const patchProd = req.params.id;
//     const findIndex = products.findIndex(p => patchProd == p.id);

//     if(findIndex != -1){
//         products[findIndex] = {
//             ...products[findIndex], // ... оператор spread, что придёт в body - измени, остальное оставь как было в products[findIndex]
//             ...req.body
//         }
//     fs.writeFile("./db.json", JSON.stringify(products, null, 2), e => {
//             if(e){
//             res.status(500).json({message: "Ошибка при записи файла"})
//         }
//         res.status(201).json({
//         message: "Товар успешно изменён",
//         products: products
//         });
//     });
//     } else {
//         return  res.status(400).json({message: "Товар не найден"})
//     }

// })


// app.listen(port, ()=>`Server running on http://localhost:${port}`);




// Перепишем операции CRUD на использование более современного способа с использованием конструкции:
// async/await — это способ писать асинхронный код (операции, которые занимают время, вроде запросов к серверу или чтения файлов) так, будто он синхронный, то есть последовательный и понятный, без сложных колбэков или цепочек .then(), при этом не блокируя основное выполнение программы

// Главные правила синтаксиса async/await:
    // 1. Слово async: Ставится перед определением функции. Это говорит Express: «Внутри этой функции будет происходить что-то долгое (асинхронное)».

    // 2. Слово await: Ставится перед самой операцией (чтение или запись файла). Оно заставляет код «подождать» завершения, не блокируя весь сервер.

    // 3. Блок try...catch: Обязателен! Если при записи файла случится ошибка, await «выбросит» её, и catch её поймает. Без этого сервер может просто «упасть».

    // 4. В каждой операции CRUD перед каким то действием мы должны прочитать файл и результат сохранить в отдельную переменнцю: Read -> Logic -> Write -> Response, там где мы используем await - мы не обрабатыввем error ошибки обрабатываються в блоке catch

const express = require("express"); 
const fs = require("fs").promises;    // поскольку мы будем использовать конструкцию async/await, значит нам нужно работать с более современныйм вариантом а имено promise
//или 
// const fs = require("fs/promises");
const { nanoid } = require("nanoid"); // библтотека для генерации id
const path = require("path"); // path в JavaScript (в основном используется в Node.js) — это встроенный модуль для обработки путей к файлам и каталогам, чтобы сделать код кроссплатформенным
const { json } = require("stream/consumers");

const dbPath = path.join(__dirname, "db.json");
// __dirname и __filename — это встроенные глобальные переменные в Node.js, которые предоставляют абсолютный путь к каталогу и файлу текущего модуля соответственно

const port = 3000;
const app = express();

app.use(express.json()); // это Middleware (промежуточное ПО), поскольку данный храняться в json, значит это Middleware переведёт ответ в обьеккт js. Или простыми словами, это включатель функции распознавания JSON.

let products = [];     // в этот массив мы сохраняем все товары что пришли в результате запроса и с ним же мы будем постоянно работать

// 2. Создаем асинхронную функцию для инициализации
const startServer = async() => {
    try {
        const data = await fs.readFile(dbPath, "UTF-8");
        products = JSON.parse(data);
        console.log(products);
    } catch (error) {
        console.error("❌ Ошибка при старте: файл не найден или пуст");
        products = []; // Если файла нет, начинаем с пустого списка
    }
};

app.get("/products", async (req, res)=> {
     try {
        const data = await fs.readFile(dbPath, "UTF-8");
        products = JSON.parse(data);
        res.json(products)
    } catch (error) {
        console.error("❌ Ошибка при старте: файл не найден или пуст");
        products = []; // Если файла нет, начинаем с пустого списка
    }  
});

app.get("/products/:id", async (req, res) => {
    try {
        const prodID = req.params.id;

        //Читаем актуальные данный из файла:
        const data = await fs.readFile(dbPath, "UTF-8");
        const products = JSON.parse(data);

        const findProd = products.find(prod => prodID == prod.id);
        if(findProd){
            res.status(201).json(findProd);
        } else (
            res.status(400).json({ message: "Товар не найден!" })
        )
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера при поиске товара" });
    }
    
})

app.post("/products", async (req, res) => {
    try {
        // 1. Сначала читаем актуальный список товаров из файла
        const data = await fs.readFile(dbPath, "UTF-8");
        const currentProducts = JSON.parse(data);

        // 2. Создаем новый товар
        const newProduct = {
            id: nanoid(3),
            name: req.body.name,
            price: req.body.price
        };

        // 3. Добавляем его в список, который только что прочитали
        currentProducts.push(newProduct);
    
    // 4. Записываем ОБНОВЛЕННЫЙ список обратно (БЕЗ колбэка!)
        await fs.writeFile(dbPath, JSON.stringify(currentProducts, null, 2));

        // 5. Отправляем ответ (уже после завершения записи)
        res.status(201).json({
            message: "Товар успешно добавлен", 
            product: newProduct
    });
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера при добавления товара" });
    }
})


app.delete("/products/:id", async (req, res) => {
try {
    const delProd = req.params.id;
    const data = await fs.readFile(dbPath, "UTF-8");
    let products = JSON.parse(data);

    const findIndex = products.find(p => delProd == p.id);
    if(!findIndex){
        return  res.status(400).json({message: "Товар не найден"})
    }
        products = products.filter(p=> delProd != p.id);

        await fs.writeFile(dbPath, JSON.stringify(products, null, 2));
        res.status(201).json({
        message: "Товар успешно удалён",
        products: products
    });

} catch (error) {
    res.status(500).json({message: "Ошибка при удалении"});
}    
})


// put - полное изменение
app.put("/products/:id", async(req, res)=>{
    try {
        const udateProd = req.params.id;
        const data = await fs.readFile(dbPath, "UTF-8");
        let products = JSON.parse(data);
        const findIndex = products.findIndex(p => udateProd == p.id);

        if(findIndex != -1){
            products[findIndex] = {
                id: udateProd,
                ...req.body
            }
        await fs.writeFile(dbPath, JSON.stringify(products, null, 2));
            res.status(201).json({
            message: "Товар успешно изменён",
            products: products
            });
        } else {
            return  res.status(400).json({message: "Товар не найден"})
        }
    } catch (error) {
        res.status(500).json({message: "Ошибка при обновлении"})
    }
})

// patch - это частичное изменение файла, например я хочу изменить только цену или название
app.patch("/products/:id", async(req, res)=>{
    try {
        const patchProd = req.params.id;
        const data = await fs.readFile(dbPath, "UTF-8")
        let products = JSON.parse(data);
        const findIndex = products.findIndex(p => patchProd == p.id);

        if(findIndex != -1){
            products[findIndex] = {
                ...products[findIndex], // ... оператор spread, что придёт в body - измени, остальное оставь как было в products[findIndex]
                ...req.body
            }
        await fs.writeFile(dbPath, JSON.stringify(products, null, 2))
        res.status(201).json({
        message: "Товар успешно изменён",
        products: products
        });
        } else {
            return  res.status(400).json({message: "Товар не найден"})
        }
    } catch (error) {
        res.status(500).json({message: "Ошибка при изменении товара"})
    }

})


app.listen(port, ()=>`Server running on http://localhost:${port}`);