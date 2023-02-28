const Joi = require("joi");
const { Types } = require("mongoose");
const AppError = require("../utils/appError");

exports.isJson = (data) => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return false;
  }
};

exports.schemaValidator =
  (schema, source = "body") =>
  (req, res, next) => {
    const { _, error } = schema.validate(req[source]);

    if (!error) return next();

    if (error) {
      const { details } = error;
      const JoiError = details
        .map((i) => i.message.replace(/['"]+/g, ""))
        .join(" , ");
      throw new AppError(JoiError, 400);
    }
  };

exports.JoiObjectId = () =>
  Joi.string().custom((value, helpers) => {
    if (!Types.ObjectId.isValid(value)) return helpers.error("any.invalid");
    return value;
  }, "Object Id Validation");
