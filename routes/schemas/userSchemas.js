const Joi = require("joi");
const { JoiObjectId } = require("../../middlewares/schemaValidator");


/**
 * @swagger
 * components:
 *   schemas:
 *     users:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - passwordConfirm
 *       properties:
 *         name:
 *           type: string
 *           description: Your Name
 *         email:
 *           type: string
 *           description: Your email
 *         password:
 *           type: string
 *           description: Your Password
 *         passwordConfirm:
 *           type: string
 *           description: Your Confirm Password
 *         role:
 *          type: string
 *          description: admin, user ,rh ,team-leader
 *       example:
 *         name: test
 *         email: test@email.com
 *         password: Aa123456
 *         passwordConfirm: Aa123456
 *         role: admin
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Updatepwd:
 *       type: object
 *       required:
 *         - passwordCurrely
 *         - password
 *         - passwordConfirm
 *       properties:
 *         passwordCurrely:
 *           type: string
 *           description: Your passwordCurrely
 *         password:
 *           type: string
 *           description: Your Password
 *         passwordConfirm:
 *           type: string
 *           description: Your Confirm Password
 *       example:
 *         passwordCurrely: 12345678
 *         password: Aa123456
 *         passwordConfirm: Aa123456
 */

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
