const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();
const {
  signup,
  login,
  resetPassword,
  forgetPassword,
} = require("./schemas/authSchemas");
const { schemaValidator } = require("../middlewares/schemaValidator");



/**
 * @swagger
 * /signup:
 *   post:
 *     summary: registor user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Auth'
 *       500:
 *         description: Some server error
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: user login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthLogin'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthLogin'
 *       500:
 *         description: Some server error
 *     security:
 *       - bearerAuth: []
 */

router.post("/signup", schemaValidator(signup), authController.signup);
router.post("/login", schemaValidator(login), authController.login);
/**
 * @swagger
 * /forgotpassword:
 *   post:
 *     summary: send mail
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthForgetPassword'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthForgetPassword'
 *       500:
 *         description: Some server error
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /resetpassword/:token:
 *   post:
 *     summary: reset your password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/resetpassword'
 *     responses:
 *       201:
 *         description: The password was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/resetpassword'
 *       500:
 *         description: Some server error
 *     security:
 *       - bearerAuth: []
 */

router.post(
  "/forgotpassword",
  schemaValidator(forgetPassword),
  authController.forgotPassword
);
router.patch(
  "/resetpassword/:token",
  schemaValidator(resetPassword),
  authController.resetPassword
);
module.exports = router;