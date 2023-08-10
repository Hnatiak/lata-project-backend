const sendEmail = require("../../service");
require("dotenv").config();

const { META_EMAIL } = process.env;

const sendHelpEmail = async (req, res) => {
  const { name, email, message } = req.body;

  const letter = `<p><span style="font-weight: 700;">Name: </span>${name}</p>
  <p><span style="font-weight: 700;">Response to: </span><a href="mailto:${email}">${email}</a></p>
  <p><span style="font-weight: 700;">Message: </span>${message}</p>
`;

  const dataEmail = {
    html: letter,
    to: META_EMAIL,
    subject: "Потрібна допомога",
  };

  await sendEmail(dataEmail);
  res.json({
    message: "Лист про допомогу надіслано успішно",
  });
};

module.exports = sendHelpEmail;