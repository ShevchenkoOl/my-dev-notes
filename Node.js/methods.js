//------------------------JSON.parse(data) // - Преобразует строку в формате JSON → в JavaScript-объект або мвсив обьєктів.
// const jsonString = '{"name": "Alex", "age": 25}';
// const user = JSON.parse(jsonString);
// console.log(typeof jsonString, jsonString);  // string {"name": "Alex", "age": 25}
// console.log(typeof user, user);              // object { name: 'Alex', age: 25 } 


//--------------------------JSON.stringify(data) // Преобразует JavaScript-объект → в строку формата JSON.
const user = { name: "Alex", age: 25 };
const jsonString = JSON.stringify(user);
console.log(typeof user, user); // object { name: 'Alex', age: 25 }
console.log(typeof jsonString, jsonString); //string {"name":"Alex","age":25}


//------res.send() - збудує HTML структуру, як ми задаєм с початку:
const html = books.map(book => `
      <h1>${book.title}</h1>
      <span>${book.description}</span>
    `).join("");
  res.send(html);  // в результаті буде звичайна веб-сторінка: White Iklo
                                                            // random text about the book

//------res.json(books) - просто передасть json, як він є

