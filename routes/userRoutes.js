const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();
const checkRole = require("../middlewares/checkRole");
const {
  createUser,
  updateUser,
  getUsers,
  checkUserId,
  signup,
  login,
  updatePassword,
  updateMe,
  resetPassword,
  forgetPassword,
} = require("./schemas/userSchemas");
const { schemaValidator } = require("../middlewares/schemaValidator");
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
 *         _id: 63f487007fc29754b6833fc4
 *         name: test
 *         email: test@email.com
 *         password: Aa123456
 *         passwordConfirm: Aa123456
 */

router.post("/signup", schemaValidator(signup), authController.signup);
router.post("/login", schemaValidator(login), authController.login);

router.post(
  "/forgotPassword",
  schemaValidator(forgetPassword),
  authController.forgotPassword
);
router.patch(
  "/resetPassword/:token",
  schemaValidator(resetPassword),
  authController.resetPassword
);

router.use(checkRole("user", "admin"));
router.patch(
  "/updateMyPassword",
  authController.protect,
  schemaValidator(updatePassword),
  authController.updatePassword
);
router.patch(
  "/updateMe",
  authController.protect,
  schemaValidator(updateMe),
  userController.updateMe
);

//users

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/users'
 */

router.use(checkRole("admin"));
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/users'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       500:
 *         description: Some server error
 */
router
  .route("/")
  .get(
    authController.protect,
    schemaValidator(getUsers, "params"),
    userController.getAllUsers
  )
  .post(
    authController.protect,
    schemaValidator(createUser),
    userController.addUser
  );

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get the users by id
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The users id
 *     responses:
 *       200:
 *         description: The users description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/users'
 *       404:
 *         description: The users was not found
 */

/**
 * @swagger
 * /users/{id}:
 *  patch:
 *    summary: Update the user by the id
 *    tags: [users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: ''
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/users'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       204:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */
router
  .route("/:id")
  .get(
    authController.protect,
    schemaValidator(checkUserId, "params"),
    userController.getUserById
  )
  .patch(
    authController.protect,
    schemaValidator(checkUserId, "params"),
    schemaValidator(updateUser),
    userController.UpdateUser
  )
  .delete(
    authController.protect,
    schemaValidator(checkUserId, "params"),
    userController.DeleteUser
  );

module.exports = router;
