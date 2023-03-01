const express = require("express");
const commentController = require("../controllers/commentController");
const authController = require("../controllers/authController");
const router = express.Router();

const { createComment } = require("./schemas/commentSchemas");
const { schemaValidator } = require("../middlewares/schemaValidator");

router.post(
  "/:id/comment",
  authController.protect,
  schemaValidator(createComment),
  authController.restrictTo("admin", "user"),
  commentController.CreateComment
);

module.exports = router;
