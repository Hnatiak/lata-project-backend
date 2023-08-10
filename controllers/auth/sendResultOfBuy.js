const sendEmail = require('../../service'); // Підставте правильний шлях до файлу sendEmail.js
require('dotenv').config();

const { META_EMAIL } = process.env;

const sendResultOfBuy = async (req, res) => {
  const { name, email, nameOfBox, sum, phone, address, paymentMethod, quantity, comment } = req.body;

  try {
    const letter = `<p><span style="font-weight: 700;">Ім'я і прізвище: </span>${name}</p>
    <p><span style="font-weight: 700;">Емейл: </span><a href="mailto:${email}">${email}</a></p>
    <p><span style="font-weight: 700;">Номер телефону: </span>${phone}</p>
    <p><span style="font-weight: 700;">Адреса доставки: </span>${address}</p>
    <p><span style="font-weight: 700;">Метод розрахунку: </span>${paymentMethod}</p>
    <p><span style="font-weight: 700;">Кількість: </span>${quantity}</p>
    <p><span style="font-weight: 700;">Назва коробки: </span>${nameOfBox}</p>
    <p><span style="font-weight: 700;">Сума: </span>${sum} грн</p>
    ${comment ? `<p><span style="font-weight: 700;">Коментар: </span>${comment}</p>` : ''}`;

    const dataEmail = {
      html: letter,
      to: META_EMAIL,
      subject: 'Покупка на сайті',
    };

    await sendEmail(dataEmail);
    res.json({
      message: 'Дані про покупку відправлено успішно.',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Виникла помилка при відправці даних про покупку.',
      error: error.message,
    });
  }
};

module.exports = sendResultOfBuy;