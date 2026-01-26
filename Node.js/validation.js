// Поля для валидации мы получаем с тела запроса, сначала проверяем на их корректность, а потом всё по алгоритну

// в методах post и put валидация проходит одинаково, а вот в putch - мы изначально проверяем или пришли нам эти данные, если пришли тогла проводим ваоидацию.
// if(name !== undefined){
//          if(typeof name !== "string" || name.trim() === ""){
//             return res.status(400).json({message: "Некорректно обновлено название товара"})
//             }
//         }
// Для PATCH лучше возвращать 200, так как мы ничего не создали с нуля

app.post("/products", async (req, res) => {
    try {
        // 1. получаем данный с тела запроса 
        const {name, price} = req.body;

        // 2. Делаем простейшую валидацию
        if(!name || typeof name !== "string" || name.trim() === ""){
            return res.status(400).json({message: "Имя товара введено не корректно"})
        }

        if(typeof price !== "number" || price === "" || price < 0){
            return res.status(400).json({message: "Цена товара введена не корректно"})
        }

        // 3. Если валидация пройдена то начинакм считывать файл
        const data = await fs.readFile(dbPath, "UTF-8");
        const currentProducts = JSON.parse(data);

        // 4. Создаём новый товар и добавляем его в список, который только что прочитали
         // 1. Создаем новый товар
        const newProduct = {
            id: nanoid(3),
            name: req.body.name,
            price: req.body.price
        };

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



// Рефакторинг - разделение большого кода на отдельные модули.
// Создадим отдельный файл validateProduct.js

export function validateProduct(data, isPatch = false){ // Параметр isPatch нужен для того, чтобы сказать функции: "Если поле отсутствует (undefined), это нормально, не ругайся. Но если оно пришло — проверь его строго".
    const {name, price} = data;

        if(!isPatch || name !== undefined){ // Если это НЕ PATCH (имя обязательна) ИЛИ если цена передана
            if(!name || typeof name !== "string" || name.trim() === ""){
                return "Имя товара введено не корректно"
            }
    }
        if(!isPatch || price !== undefined){ // Если это НЕ PATCH (цена обязательна) ИЛИ если цена передана
            if(typeof price !== "number" || price === "" || price < 0){
                return "Цена товара введена не корректно"
            }
}
return null;  // Ошибок нет
};

// index.js
const { validateProduct } = require("./validateProduct");

app.post("/products", async (req, res) => {
    try {
        const error = validateProduct(req.body); // Обычная валидация
        if (error) {
            return res.status(400).json({ message: error });
        }
        // остальное остаёться как было
    } catch(error){

    };
});

// в операции put всё будет аналогично


// в putch мы передаём дополнительный параметр true, который активирует isPatch
app.patch("/products/:id", async(req, res)=>{
    try {
        // Передаем true вторым аргументом
        const error = validateProduct(req.body, true); 
        if (error) {
            return res.status(400).json({ message: error });
        }
        // остальное остаёться как было
    } catch (error) {
        res.status(500).json({message: "Ошибка при изменении товара"})
    }
})
