//------------------------JSON.parse(data) // - Преобразует строку в формате JSON → в JavaScript-объект.
// const jsonString = '{"name": "Alex", "age": 25}';
// const user = JSON.parse(jsonString);
// console.log(typeof jsonString, jsonString); // string {"name": "Alex", "age": 25}
// console.log(typeof user, user); // object { name: 'Alex', age: 25 } 


//--------------------------JSON.stringify(data) // Преобразует JavaScript-объект → в строку формата JSON.
const user = { name: "Alex", age: 25 };
const jsonString = JSON.stringify(user);
console.log(typeof user, user); // object { name: 'Alex', age: 25 }
console.log(typeof jsonString, jsonString); //string {"name":"Alex","age":25}
