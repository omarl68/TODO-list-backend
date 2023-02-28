const Joi = require("joi");



exports.createComment = Joi.object({
    content: Joi.string().trim().min(1).required(),
  });