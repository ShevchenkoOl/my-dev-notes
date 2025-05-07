// Навігація по сайту:
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
