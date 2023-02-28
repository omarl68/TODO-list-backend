const Joi = require("joi");


exports.createTask = Joi.object({
  title: Joi.string().trim().min(2).max(20).required(),
  description: Joi.string().required().trim().min(5),
  statustask: Joi.string().valid("pending", "in_progress", "done"),
  comments: Joi.string().optional()
});
exports.updateTask = Joi.object({
    title: Joi.string().trim().min(2).max(20).optional(),
    description: Joi.string().required().trim().min(5).optional(),
    statustask: Joi.string().valid("pending", "in_progress", "done").optional(),
    comments: Joi.string().optional()
  });
  exports.getTasks = Joi.object({
    title: Joi.string().trim().min(2).max(20).optional(),
    description: Joi.string().required().trim().min(5).optional(),
    statustask: Joi.string().valid("pending", "in_progress", "done").optional(),
    comments: Joi.string().optional()
  });