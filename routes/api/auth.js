const express = require("express")
// const ctrl = require("../../controllers")
const ctrl = require('../../controllers/index')
const {validateBody, authenticate} = require("../../middlewares")
const {schemas} = require('../../models/user')

const router = express.Router()

router.post("/register", validateBody(schemas.registerSchema), ctrl.registerUser); // signup
router.post("/login", validateBody(schemas.loginSchema), ctrl.loginUser); // signin
// router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logoutUser);

module.exports = router