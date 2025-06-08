// "путь к файлу" — file path
// "относительный путь" — relative path
// "абсолютный путь" — absolute path
// якщо ми отримуємо помилку в шляху до файла, ми можемо викоистати глобальга змінна __dirname - це встроєна команда з абсолюьним шляхом до того місця де вона використовужться, тобто: const text = await fs.readFile(`${__dirname}/file.txt`, "utf-8");
// __dirname - абсолютний шлях до папки;
// __filename - абсолютний шлях до файлу;
//Для більш гарнішого редагування шляху використовуємо встрожний модуль path
const fullDicertion = path.join(__dirname, "text.txt");

// Окрім цього, Node.js имеет встроенный модуль path, который помогает работать с путями правильно на всех операционных системах:

import path from 'path';

const fullPath = path.resolve('data', 'file.txt'); // абсолютный путь 'data'-абсолюьний шлях до папки data, другий аргумент - абсолюьний шлях до файла - 'file.txt'
console.log(fullPath); // /Users/yourname/project/data/file.txt
// path.resolve роєднує два шляхи в один


// path.resolve - отримати абсолютний шлях path.resolve('data', 'file.txt')
// path.join - просто з'єднати частини шляху path.join(__dirname, 'data.json')