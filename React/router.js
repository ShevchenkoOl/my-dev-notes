// Навігація по сайту:
// В React router (чаще всего используется библиотека react-router-dom) нужен для навигации между страницами приложения без полной перезагрузки страницы.
// ✅ Шаг 1. встановлюємо npm пакет:
// npm i react-router-dom

// ✅ Шаг 2. Створюємо файл router.jsx:

import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/courses",
    element: <Courses />,
    errorElement: <ErrorPage />,
  }
]);

export default router;

// ✅ Шаг 3. В файлі main.jsx або index.jx добавляємо компонент RouterProvider:

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>
)

// ✅ Шаг 4. Використовуємо Link там де нам потрібна навігація наприклад в navMenu.jsx:

import { Link } from "react-router-dom";
const Nav = () => {

  return (
    <nav className={styles.nav}>
      <Link to="/">О нас</Link>
      <Link to="/courses">Курсы</Link>
   </nav>
  );
};

// export default Nav;

// В React Router NavLink и Link — это компоненты для навигации, но между ними есть несколько отличий:

// Link:
// Это базовый компонент для создания ссылок внутри приложения, которые позволяют переходить на другие страницы (маршруты) без перезагрузки страницы.
// Пример использования:

<Link to="/home">Home</Link>

NavLink:
// Это расширение компонента Link, но с дополнительной функциональностью: он автоматически применяет активный стиль (CSS-класс) к элементу, когда он активен (то есть когда путь совпадает с текущим маршрутом).
// Это полезно, например, для создания навигационных меню, где текущий активный элемент выделяется.
// Пример использования:
<NavLink to="/home" activeClassName="active">Home</NavLink>
// В этом примере, когда пользователь находится на странице /home, элемент будет иметь класс active, который можно стилизовать.

// Коротко, в навбаре мы используем NavLinк, в других случаях Linк, но если хотим что-бы страница открывалась в новом окне тогда NavLinк