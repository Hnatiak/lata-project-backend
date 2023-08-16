// const { controllerWrapper } = require("../../decorators");

// const registerUser = require("./registerUser");
// const loginUser = require("./loginUser");
// const logoutUser = require("./logoutUser");

// module.exports = {
//   registerUser: controllerWrapper(registerUser),
//   loginUser: controllerWrapper(loginUser),
//   logoutUser: controllerWrapper(logoutUser),
// };

const { ctrlWrapper } = require("../../helpers");

const registerUser = require("./registerUser");
const loginUser = require("./loginUser");
const logoutUser = require("./logoutUser");
const passport = require('../../middlewares/google-authanticate')
const sendHelpEmail = require("./sendHelpEmail");
const sendResultOfBuy = require("./sendResultOfBuy");

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  logoutUser: ctrlWrapper(logoutUser),
  passport: ctrlWrapper(passport),
  sendHelpEmail: ctrlWrapper(sendHelpEmail),
  sendResultOfBuy: ctrlWrapper(sendResultOfBuy),
};