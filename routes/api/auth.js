const express = require("express")
// const ctrl = require("../../controllers")
const ctrl = require('../../controllers/auth')
const {validateBody, authenticate} = require("../../middlewares")
const {schemas} = require('../../models/user')
const {buySchemasForPay} = require('../../models/buySchema')
const sendHelpEmail = require("../../controllers/auth/sendHelpEmail");
const sendResultOfBuy = require("../../controllers/auth/sendResultOfBuy")

const router = express.Router()

router.post("/register", validateBody(schemas.registerSchema), ctrl.register); // signup
router.post("/login", validateBody(schemas.loginSchema), ctrl.login); // signin
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
// router.post("/help", validateBody(schemas.sendHelpEmailSchema), schemas.sendHelpEmail);
router.post("/help", validateBody(schemas.sendHelpEmailSchema), sendHelpEmail);
router.post("/buy", validateBody(buySchemasForPay.buyValidationSchema), sendResultOfBuy);

module.exports = router