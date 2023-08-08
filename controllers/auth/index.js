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
const sendHelpEmail = require("./sendHelpEmail");

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  logoutUser: ctrlWrapper(logoutUser),
  sendHelpEmail: ctrlWrapper(sendHelpEmail),
};