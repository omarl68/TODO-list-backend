const Joi = require("joi");


/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
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
 *       example:
 *         name: test
 *         email: test@email.com
 *         password: Aa123456
 *         passwordConfirm: Aa123456
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Your email
 *         password:
 *           type: string
 *           description: Your Password
 *       example:
 *         email: test@email.com
 *         password: 12345678
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthForgetPassword:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           description: Your email
 *       example:
 *         email: test@email.com
 */




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

 exports.forgetPassword = Joi.object({
    email: Joi.string().required(),
  });
  
  exports.resetPasswordToken = Joi.object({
    token: Joi.string().required(),
  });