const express = require("express");
const ctrl = require("../../controllers/review");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const {schemas} = require("../../models/review")

const router = express.Router();

router.get("/", ctrl.getReviews);
router.post("/", authenticate, ctrl.addReview); // validateBody(schemas.addSchema),
router.put("/:id", authenticate, isValidId, ctrl.editReview); // validateBody(schemas.putSchema),
router.delete("/:id", authenticate, isValidId, ctrl.deleteReview);

module.exports = router;