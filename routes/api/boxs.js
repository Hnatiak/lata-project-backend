const express = require("express");
const ctrl = require("../../controllers/boxs");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const {schemas} = require("../../models/box")

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.add);

router.put("/:id", authenticate, isValidId, validateBody(schemas.putSchema), ctrl.updateById);

router.patch("/:id/favorite", authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusBox);

router.delete("/:id", authenticate, isValidId, ctrl.deleteById);

module.exports = router;