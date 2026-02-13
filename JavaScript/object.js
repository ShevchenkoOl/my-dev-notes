const obj = {
name: "Alex",
age: 25,
isOnline: true
};

// 1. Object.keys(obj) - выводит все ключи обьекта obj
console.log(Object.keys(obj)); // [ 'name', 'age', 'isOnline' ]

// 2. Object.values(obj) - выводит все значения обьекта obj
console.log(Object.values(obj));

// 3. Object.entries(obj) - выводит массив пар  обьекта obj ключ - значение
console.log(Object.entries(obj)); // [ [ 'name', 'Alex' ], [ 'age', 25 ], [ 'isOnline', true ] ]
