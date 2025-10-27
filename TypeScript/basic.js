// TypeScript je nadstavba nad JavaScriptem, která přidává systém typování.
// Slouží k určení datových typů, se kterými program pracuje během vývoje.
// Díky tomu lze odhalit chyby dříve, než se program spustí.
// example.ts
function great(name) {
    return "\u041F\u0440\u0438\u0432\u0435\u0442, ".concat(name, "!");
}
console.log(great("Алексей"));
// після написання коду ми коомпеліруємо: в терміналі прописуємо команду
// tsc example.ts
// Для установки TS:
// npm install -g typescript
