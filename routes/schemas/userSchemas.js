const Joi = require("joi");
const { JoiObjectId } = require("../../middlewares/schemaValidator");

exports.createUser = Joi.object({
  name: Joi.string().trim().min(2).max(20).required(),
  email: Joi.string().min(3).required().email(),
  password: Joi.string()
    .min(8)
    .required()
    .regex(/^[a-zA-Z0-9]{8,30}$/),
  passwordConfirm: Joi.string()
    .min(8)
    .required()
    .valid(Joi.ref("password"))
    .regex(/^[a-zA-Z0-9]{8,30}$/),
  role:Joi.string().optional()
});
exports.updateUser = Joi.object({
  name: Joi.string().trim().min(2).max(20).optional(),
  email: Joi.string().min(3).required().email().optional(),
  password: Joi.string()
    .min(8)
    .required()
    .regex(/^[a-zA-Z0-9]{8,30}$/)
    .optional(),
  passwordConfirm: Joi.string()
    .min(8)
    .required()
    .valid(Joi.ref("password"))
    .regex(/^[a-zA-Z0-9]{8,30}$/)
    .optional(),
    role:Joi.string().optional()
});

exports.getUsers = Joi.object({
  name: Joi.string().trim().min(2).max(20).optional(),
  email: Joi.string().min(3).email().optional(),
});
exports.checkUserId = Joi.object({
  id: JoiObjectId().required(),
});

exports.forgetPassword = Joi.object({
  email: Joi.string().required(),
});

exports.resetPasswordToken = Joi.object({
  token: Joi.string().required(),
});

exports.resetPassword = Joi.object({
  password: Joi.string()
    .min(8)
    .regex(/^[a-zA-Z0-9]{8,30}$/)
    .required(),
  passwordConfirm: Joi.string()
    .min(8)
    .valid(Joi.ref("password"))
    .regex(/^[a-zA-Z0-9]{8,30}$/)
    .required(),
});

exports.signup = Joi.object().keys({
  name: Joi.string().trim().min(2).max(20).required(),
  email: Joi.string().min(3).required().email(),
  password: Joi.string()
    .min(8)
    .required()
    .regex(/^[a-zA-Z0-9]{8,30}$/),
  passwordConfirm: Joi.string()
    .min(8)
    .required()
    .valid(Joi.ref("password"))
    .regex(/^[a-zA-Z0-9]{8,30}$/),
});

exports.login = Joi.object({
  email: Joi.string().min(3).required().email(),
  password: Joi.string()
    .min(8)
    .required()
    .regex(/^[a-zA-Z0-9]{8,30}$/),
});

exports.updatePassword = Joi.object().keys({
  passwordCurrely: Joi.string()
    .required()
    .regex(/^[a-zA-Z0-9]{8,30}$/),
  password: Joi.string()
    .min(8)
    .required()
    .regex(/^[a-zA-Z0-9]{8,30}$/),
  passwordConfirm: Joi.string()
    .min(8)
    .required()
    .valid(Joi.ref("password"))
    .regex(/^[a-zA-Z0-9]{8,30}$/),
});
exports.updateMe = Joi.object().keys({
  name: Joi.string().trim().min(2).max(20).optional(),
  email: Joi.string().email().optional(),
});
