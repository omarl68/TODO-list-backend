const Joi = require("joi");
const { JoiObjectId } = require("../../middlewares/schemaValidator");

exports.createTask = Joi.object({
  title: Joi.string().trim().min(2).max(20).required(),
  description: Joi.string().required().trim().min(5),
  statustask: Joi.string().valid("pending", "in_progress", "done"),
});
exports.updateTask = Joi.object({
    title: Joi.string().trim().min(2).max(20).required().optional(),
    description: Joi.string().required().trim().min(5).optional(),
    statustask: Joi.string().valid("pending", "in_progress", "done").optional(),
  });
  exports.getTasks = Joi.object({
    title: Joi.string().trim().min(2).max(20).required().optional(),
    description: Joi.string().required().trim().min(5).optional(),
    statustask: Joi.string().valid("pending", "in_progress", "done").optional(),
  });