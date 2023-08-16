const express = require("express");
const ctrl = require("../../controllers/review");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const {schemas} = require("../../models/review")

const router = express.Router();

router.get("/", ctrl.getReviews);
router.post("/", authenticate, validateBody(schemas.reviewPostSchema), ctrl.addReview); // validateBody(schemas.addSchema),
router.delete("/:id", authenticate, isValidId, ctrl.deleteReview);

module.exports = router;