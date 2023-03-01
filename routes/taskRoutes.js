const express = require("express");
const taskController = require("../controllers/taskController");
const authController = require("../controllers/authController");
const router = express.Router();

const { createTask, getTasks, updateTask } = require("./schemas/taskSchemas");
const { createComment } = require("./schemas/commentSchemas");
const { schemaValidator } = require("../middlewares/schemaValidator");

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
