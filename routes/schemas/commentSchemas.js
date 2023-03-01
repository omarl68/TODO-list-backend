const Joi = require("joi");


/**
 * @swagger
 * components:
 *   schemas:
 *     comment:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         content:
 *           type: string
 *           description: Your comment
 *         
 *       example:
 *         content: "write your own comment"
 */

exports.createComment = Joi.object({
    content: Joi.string().trim().min(1).required(),
  });