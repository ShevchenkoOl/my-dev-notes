// ✅ Шаг 1. Зарегистрируйся на EmailJS:
//  - Перейди на https://emailjs.com
//  - Зарегистрируйся
//  - Перейди во вкладку Email Services
//  - Добавь сервис (например, Gmail)
//  - Подтверди доступ

// ✅ Шаг 2. Создай шаблон письма:
// Перейди в Email Templates
// Создай новый шаблон наример:
<div style="font-family: system-ui, sans-serif, Arial; font-size: 14px; color: #2c3e50;">
  <h2 style="margin-bottom: 10px;">📩 Новое сообщение с сайта ITeduka.cz</h2>
  <p>Вы получили сообщение от <strong>{{name}}</strong>.</p>
  
  <div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #005BBB;">
    <p style="margin: 0 0 10px 0;"><strong>Имя:</strong> {{name}}</p>  //эти переменые будут прихолить на твою почту
    <p style="margin: 0 0 10px 0;"><strong>Email:</strong> {{email}}</p> // их можна добавить и больше всё зависит от задач
    <p style="margin: 0;"><strong>Сообщение:</strong><br/>{{message}}</p>
  </div>

  <hr style="margin: 20px 0; border: none; border-top: 1px dashed #ccc;" />
  <p style="font-size: 12px; color: #777;">Это сообщение было отправлено с формы обратной связи на сайте ITeduka.cz</p>
</div>

// ✅ Шаг 3. Установи библиотеку EmailJS:
// npm install emailjs-com

// ✅ Шаг 4. Обнови компонент ModalForm для отправки письма:

import { useState } from "react";
import emailjs from "emailjs-com";

const ModalForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.consent) return;

    // Подготовка данных для шаблона EmailJS
    const templateParams = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      message: form.message || "—",
    };

    emailjs.send(
      "service_3pvcue2",     // service ID
      "template_z6k7v3b",    // template ID
      templateParams,
      "FGzHtyacUjtip8LrO"      // public key
    )
    .then(() => {
      alert("✅ Сообщение отправлено!");
      onClose();
    })
    .catch((error) => {
      console.error("Ошибка при отправке:", error);
      alert("❌ Произошла ошибка при отправке сообщения.");
    });
  };

  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Ваше имя"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Ваш email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <textarea
        name="message"
        placeholder="Ваше сообщение"
        value={formData.message}
        onChange={handleChange}
        required
      />
      <button type="submit">Отправить</button>
      <button type="button" onClick={onClose}>Закрыть</button>
    </form>
  );
};

export default ModalForm;

