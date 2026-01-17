// За рвботу з файлами выдповыдає встроєний пакет fs (file system)
// Спосіб 1. Найсучасніший та найпопулярніший спосіб
const fs = require("fs/promises");// або const fs = require("fs").promises;
// для того щоб перевірити чи праильно встановлений модуль:
try {
    const files = await fs.readdir(".");
    console.log("Список файлів у поточній папці: ", files);
} catch (error) {
    console.log("Помилка при читанні папки", error)
}

const func = async() => {
    try {
    // readFile() - Читанна файлу

    // const buffer = await fs.readFile("./file.txt") // зміст файлу отримуємо в формі коду buffer
    // const text = buffer.toSrting() // переводимо до рядка
    // console.log(text);

    // більш простіший спосіб
    const text = await fs.readFile("./file.txt", "utf-8"); //відразу переводимо до тексту
    console.log(text);
    

    // Дописування в файл appendFile()
    await fs.appendFile("./file.txt", "Тещо маэ дописатися в файл"); // при визову в консоль поверне underfined але сам файл допише
    // якщо ми хочемо дописати щось в файл якого не існує, то node.js його спочатку створить і запиши ту інфо яку ми зазначили


    //Перезаписуванна файлу writeFile
    await fs.writeFile("./file.txt", "Новий зміст файлу") // при визові в консоль теж поверне underfined але сам файл перезапише
    // якщо ми хочемо переписати файл якого не існує, то node.js його спочатку створить і запиши ту інфо яку ми зазначили
    
    
    // якщо ми працюємо з форматом json, то спочатку оголошужм зміну зі змістом нової інформації
        const newContact = {
            id: 'ZZW',
            name: 'Jose La Costa',
            email: 'lacosta@gmail.com',
            phone: '7789578541'
        };
    // потім перетворюємо в JSON з відступами для читабельності
        const jsonData = JSON.stringify(newContact, null, 2);
    // а потім перезаписужмо файл
        await fs.writeFile("contacts.json", jsonData, "utf-8");
    
    
    // Видалення файлу unlink() 
    await fs.unlink("./text.txt");
    
    // в випадку перезаписування, дописування та видалення файлу, нам нічого не повертажться в консолі underfined - тоді зміни можно не оголошувати а відразу писати await fs.unlink....... 
}
  catch (error) {  // При роботы з файлами краще обробляти помилки, тому ы обгортажио в конструкцію try{} catch{}
    console.error("Виникла помилка при роботі з файлом:", error.message);
  }

};

func();

// Спосіб 2. Через також через проміс але не дуже зручно
fs.readFile("./file.txt")
    .then(data => console.log(data))
    .catch(error => console.log(error.message))


// Спосіб 3. Використоввувався в перших версіях node.js
const fs = require("fs");
fs.readFile("./file.txt", (error, data)=>{ // після шляху, другим аргументом ми передаєм колбек функцію, яка спочатку обробляє помилку, а потім сам зміст файлу, але виводить резутьтат в формі коду buffer 
    console.log(error);
    console.log(data); 
})


// Всі вишеуказанні методи для роботи з файлами є асінзроні, при виконанні яких не блокується загальний потік, але можна використовувати і синхронні:
// Асинхронные (рекомендуемые)	       Синхронные
// fs.appendFile()	                   fs.appendFileSync()
// fs.readFile()	                   fs.readFileSync()
// fs.writeFile()	                   fs.writeFileSync()

// Усі асинхронні дії з файломи обовязково принісають третім параметром колбек функцію для обробки помилки:
// fs.readFile(path, options, callback)

fs.readFile("./data.json", "utf-8", error => {
    if(error){
       console.error("Ошибка чтения файла", err);
       return;
    }
})

// Синхроні - fs.readFileSync(path, options)