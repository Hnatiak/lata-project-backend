const express = require("express")
// const ctrl = require("../../controllers")
const ctrl = require('../../controllers/auth')
const {validateBody, authenticate} = require("../../middlewares")
const {schemas} = require('../../models/user')
const sendHelpEmail = require("../../controllers/auth/sendHelpEmail");

const router = express.Router()

router.post("/register", validateBody(schemas.registerSchema), ctrl.register); // signup
router.post("/login", validateBody(schemas.loginSchema), ctrl.login); // signin
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
// router.post("/help", validateBody(schemas.sendHelpEmailSchema), schemas.sendHelpEmail);
router.post("/help", validateBody(schemas.sendHelpEmailSchema), sendHelpEmail);

module.exports = router