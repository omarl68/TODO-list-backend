const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();

const {
  createUser,
  updateUser,
  getUsers,
  checkUserId,
  updatePassword,
  updateMe,
} = require("./schemas/userSchemas");
const { schemaValidator } = require("../middlewares/schemaValidator");
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
 * /users/update-password:
 *  patch:
 *    summary: Update My  password
 *    tags: [users]
 *    parameters:
 *      - in: path
 *        passwordCurrely : string
 *        password: string,
 *        passwordConfirm : string,
 *        schema:
 *          type: string
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/Updatepwd'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *             $ref: '#/components/schemas/Updatepwd'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 *    security:
 *      - bearerAuth: []
 */

/**
 * @swagger
 * /users/me:
 *  patch:
 *    summary: Update my name or my email
 *    tags: [users]
 *    parameters:
 *      - in: path
 *        name: string,
 *        email : string
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
 *    security:
 *      - bearerAuth: []
 */

router.patch(
  "/update-password",
  authController.protect,
  schemaValidator(updatePassword),
  authController.restrictTo("admin", "user"),
  authController.updatePassword
);
router.patch(
  "/me",
  authController.protect,
  schemaValidator(updateMe),
  authController.restrictTo("admin", "user"),
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
 *     security:
 *        - bearerAuth: []
 */

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
 *               $ref: '#/components/schemas/users'
 *       500:
 *         description: Some server error
 *     security:
 *       - bearerAuth: []
 */
router
  .route("/")
  .get(
    authController.protect,
    schemaValidator(getUsers, "params"),
    authController.restrictTo("admin"),
    userController.getAllUsers
  )
  .post(
    authController.protect,
    schemaValidator(createUser),
    authController.restrictTo("admin"),
    userController.addUser
  );

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get one user by id
 *     tags: [users]
 *     parameters:
 *      - in: path
 *        name: id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/users'
 *     security:
 *      - bearerAuth: []
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
 *    security:
 *      - bearerAuth: []
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
 *     security:
 *       - bearerAuth: []
 */
router
  .route("/:id")
  .get(
    authController.protect,
    schemaValidator(checkUserId, "params"),
    authController.restrictTo("admin"),
    userController.getUserById
  )
  .patch(
    authController.protect,
    schemaValidator(checkUserId, "params"),
    authController.restrictTo("admin"),
    schemaValidator(updateUser),
    userController.UpdateUser
  )
  .delete(
    authController.protect,
    schemaValidator(checkUserId, "params"),
    authController.restrictTo("admin"),
    userController.DeleteUser
  );

module.exports = router;
