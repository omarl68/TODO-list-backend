const express = require("express");
const commentController = require("../controllers/commentController");
const authController = require("../controllers/authController");
const router = express.Router();

const { createComment } = require("./schemas/commentSchemas");
const { schemaValidator } = require("../middlewares/schemaValidator");

/**
 * @swagger
 * /{id}/comment:
 *   post:
 *     summary: Create a new comment
 *     tags: [comment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/comment'
 *     responses:
 *       201:
 *         description: The comment was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/comment'
 *       500:
 *         description: Some server error
 */

router.post(
  "/:id/comment",
  authController.protect,
  schemaValidator(createComment),
  authController.restrictTo("admin", "user"),
  commentController.CreateComment
);

module.exports = router;
