const Joi = require("joi");


/**
 * @swagger
 * components:
 *   securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     tasks:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         title:
 *           type: string
 *           description: Your title
 *         description:
 *           type: string
 *           description: Your description
 *         statustask:
 *           type: string
 *           description: pending, in_progress, done
 *         comments:
 *           type: array
 *           description: see comment 
 *         share:
 *          type: array
 *          description: share task for users
 *       example:
 *        
 *         title: test
 *         description: type any think you want
 *         share: [63fc6eff1a649ed199b695ed]
 */


exports.createTask = Joi.object({
  title: Joi.string().trim().min(2).max(20).required(),
  description: Joi.string().required().trim().min(5),
  statustask: Joi.string().valid("pending", "in_progress", "done"),
  comments: Joi.string().optional(),
  share: Joi.string().optional()

});
exports.updateTask = Joi.object({
    title: Joi.string().trim().min(2).max(20).optional(),
    description: Joi.string().required().trim().min(5).optional(),
    statustask: Joi.string().valid("pending", "in_progress", "done").optional(),
    comments: Joi.string().optional(),
    share: Joi.string().optional()
  });
  exports.getTasks = Joi.object({
    title: Joi.string().trim().min(2).max(20).optional(),
    description: Joi.string().required().trim().min(5).optional(),
    statustask: Joi.string().valid("pending", "in_progress", "done").optional(),
    comments: Joi.string().optional()
  });