const contacts = [
  {
    "id": "qdggE76Jtbfd9eWJHrssH",
    "name": "Chaim Lewis",
    "email": "dui.in@egetlacus.ca",
    "phone": "(294) 840-6685"
  },
  {
    "id": "drsAJ4SHPYqZeG-83QTVW",
    "name": "Kennedy Lane",
    "email": "mattis.Cras@nonenimMauris.net",
    "phone": "(542) 451-7038"
  }
]

// .push(...) - використовується для додавання одного або кількох елементів у кінець масиву. Він змінює сам масив і повертає нову довжину масиву.
// console.log(contacts.push("newObject", {id: 15, name: "Alex"})); // 4 - це нова довжина
// console.log(contacts);

// .filter(...) — метод масиву, який створює новий масив, залишаючи лише ті елементи, для яких умова в дужках повертає true.
// console.log(contacts.filter(contact => contact.id != "drsAJ4SHPYqZeG-83QTVW")); // поверне новий масив, в якому не буде обєкта контакта з id "drsAJ4SHPYqZeG-83QTVW"ю Підхоьить для видалення.


// .find(...) - шукає перший елемент масиву, який задовольняє певну умову, і повертає цей елемент. Якщо нічого не знайде — поверне undefined. 
// console.log(contacts.find(contact => contact.id === "drsAJ4SHPYqZeG-83QTVW"));

// .findIndex(...) - шукає перший елемент масиву, який задовольняє певну умову, і повертає його індекс. Якщо нічого не знайде — поверне -1
// console.log(contacts.findIndex(contact => contact.id === "drsAJ4SHPYqZeG-83QTVW"));

//.map — это метод массивов в JavaScript, который преобразует каждый элемент массива и возвращает новый массив.
// const newArr = contacts.map(contact => contact.name);
// console.log(newArr);