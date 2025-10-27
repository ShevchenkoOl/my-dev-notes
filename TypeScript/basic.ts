// TypeScript je nadstavba nad JavaScriptem, která přidává systém typování.
// Slouží k určení datových typů, se kterými program pracuje během vývoje.
// Díky tomu lze odhalit chyby dříve, než se program spustí.
// example.ts
function great(name: string): string {
  return `Привет, ${name}!`;
}
console.log(great("Алексей"));
// після написання коду ми коомпеліруємо, для цього спочатку потрібно встановити ТС:
// npm install -g typescript
// крок 2 запускаєм:
// tsc example.ts

// Після запуску, в тій самій директорії стрвориться новій файл basic.js, ы оскыльки назви зміних у них будуть однакові то в терміналі видасть помилку:
// Duplicate function implementation.
// Її можна виправити завдяки створенню tsconfig.json в цій самій директорії:
// {
//   "compilerOptions": {
//     "target": "ES6",
//     "module": "commonjs",
//     "outDir": "dist",
//     "strict": true
//   },
//   "exclude": ["node_modules", "**/*.js"]
// }

