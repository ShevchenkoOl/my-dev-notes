// алгоритм слухаччя події на кнопку (віткриття модалки або спрацбвання кнопки):
// 1. створюємо стан:
// const [isModalOpen, setIsModalOpen] = useState(false);
// isModalOpen — переменная, которая хранит открыта ли модалка.
// setIsModalOpen — функция, чтобы изменить это значение.
// Начальное значение — false (то есть модалка закрыта).

// 2. в контейнері де буде спрацювувати слухач події:
// onClick={handleOpen}.

// 3. створюємо функцію handleOpen - яка буде змінювати стан з isModalOpen на setIsModalOpen
// const handleOpen = () => {
//     if (isOpen) {
//         setIsOpen(false);
//     } else {
//         setIsOpen(true);
//     }
// }

// 4. реддаримо сам код:
// {isOpen && (
//     <div className={styles.chatContainer}>
//         <h2>Chat with us!</h2>
//         <p>We are here to help you.</p>
//     </div>
// )}