const express = require("express");
const taskController = require("../controllers/taskController");
const authController = require("../controllers/authController");
const router = express.Router();

const { createTask, getTasks, updateTask } = require("./schemas/taskSchemas");

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
 * /tasks:
 *   get:
 *     summary: get my tasks
 *     tags: [tasks]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/tasks'
 *     security:
 *      - bearerAuth: []
 */
/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/tasks'
 *     responses:
 *       201:
 *         description: The tasks was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/tasks'
 *       500:
 *         description: Some server error
 *     security:
 *      - bearerAuth: []
 */
router
  .route("/")
  .get(
    authController.protect,
    schemaValidator(getTasks),
    authController.restrictTo("admin", "user"),
    taskController.getMyTask
  )
  .post(
    authController.protect,
    schemaValidator(createTask),
    authController.restrictTo("admin", "user"),
    taskController.CreateTask
  );

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get my task with id
 *     tags: [tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *     responses:
 *       200:
 *         description: The task description by id
 *      content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/tasks'
 *       404:
 *         description: The tasks was not found
 *     security:
 *      - bearerAuth: []
 */

/**
 * @swagger
 * /tasks/{id}:
 *  put:
 *    summary: Update my task by the id
 *    tags: [tasks]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *
 *        description: The task id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: ''
 *    responses:
 *      200:
 *        description: The task was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/tasks'
 *      404:
 *        description: The task was not found
 *      500:
 *        description: Some error happened
 * 
 *    security:
 *      - bearerAuth: []
 */

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Remove my task by id
 *     tags: [tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *
 *     responses:
 *       204:
 *         description: The task was deleted
 *       404:
 *         description: The task was not found
 *     security:
 *      - bearerAuth: []
 */
router
  .route("/:id")
  .get(
    authController.protect,
    schemaValidator(getTasks),
    authController.restrictTo("admin", "user"),
    taskController.getMyTaskById
  )
  .put(
    authController.protect,
    schemaValidator(updateTask),
    authController.restrictTo("admin", "user"),
    taskController.updateMyTask
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "user"),
    taskController.deleteMyTask
  );
/**
 * @swagger
 * /tasks/{id}/share:
 *  patch:
 *    summary: Update task to how many you want to send
 *    tags: [tasks]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *
 *        description: The tasks id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: ''
 *    responses:
 *      200:
 *        description: Task update with share
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/tasks'
 *      404:
 *        description: The task was not found
 *      500:
 *        description: Some error happened
 * 
 *    security:
 *      - bearerAuth: []
 */

/**
 * @swagger
 * /tasks/shared/me:
 *   get:
 *     summary: tasks shared for me
 *     tags: [tasks]
 *     responses:
 *       200:
 *         description: The list of the tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/tasks'
 * 
 *     security:
 *      - bearerAuth: []
 */
router.patch(
  "/:id/share",
  authController.protect,
  authController.restrictTo("admin", "user"),
  taskController.ShareTo
);
router
  .route("/shared/me")
  .get(
    authController.protect,
    authController.restrictTo("admin", "user"),
    taskController.getshare
  );

//admin

/**
 * @swagger
 * /all/admin:
 *   get:
 *     summary: Returns the list of all the tasks of all users for admin
 *     tags: [tasks]
 *     responses:
 *       200:
 *         description: The list of the tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/tasks'
 *     security:
 *        - bearerAuth: []
 */

/**
 * @swagger
 * /all/admin:
 *   post:
 *     summary: Create a new task for admin
 *     tags: [tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/tasks'
 *     responses:
 *       201:
 *         description: The task was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/tasks'
 *       500:
 *         description: Some server error
 *     security:
 *       - bearerAuth: []
 */
router
  .route("/all/admin")
  .get(
    authController.protect,
    schemaValidator(getTasks),
    authController.restrictTo("admin"),
    taskController.getAllTask
  )
  .post(
    authController.protect,
    schemaValidator(createTask),
    authController.restrictTo("admin"),
    taskController.CreateTask
  );


/**
 * @swagger
 * /admin/{id}:
 *   get:
 *     summary: Get one task by id for admin
 *     tags: [tasks]
 *     parameters:
 *      - in: path
 *        name: id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/tasks'
 *     security:
 *      - bearerAuth: []
 */


/**
 * @swagger
 * /admin/{id}:
 *  patch:
 *    summary: Update the task by the id for admin
 *    tags: [tasks]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *
 *        description: The task id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: ''
 *    responses:
 *      200:
 *        description: The task was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/tasks'
 *      404:
 *        description: The task was not found
 *      500:
 *        description: Some error happened
 *    security:
 *      - bearerAuth: []
 */

/**
 * @swagger
 * /admin/{id}:
 *   delete:
 *     summary: Remove the task by id for admin
 *     tags: [tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *
 *     responses:
 *       204:
 *         description: The task was deleted
 *       404:
 *         description: The task was not found
 *     security:
 *       - bearerAuth: []
 */

router
  .route("/admin/:id")
  .get(
    authController.protect,
    schemaValidator(getTasks),
    authController.restrictTo("admin"),
    taskController.getTaskById
  )
  .put(
    authController.protect,
    schemaValidator(updateTask),
    authController.restrictTo("admin"),
    taskController.UpdateTask
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    taskController.DeleteTask
  );
module.exports = router;
