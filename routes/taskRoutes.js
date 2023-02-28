const express = require("express");
const taskController = require("../controllers/taskController");
const authController = require("../controllers/authController");
const router = express.Router();
const checkRole = require("../middlewares/checkRole");
const {
  createTask,
  getTasks,
  updateTask
} = require("./schemas/taskSchemas");
const { schemaValidator } = require("../middlewares/schemaValidator");

router.use(checkRole("user", "admin"));
router
  .route("/")
  .get(authController.protect,schemaValidator(getTasks), taskController.getMyTask)
  .post(authController.protect,schemaValidator(createTask), taskController.CreateTask);

router
  .route("/:id")
  .get(authController.protect,schemaValidator(getTasks), taskController.getMyTaskById)
  .put(authController.protect,schemaValidator(updateTask), taskController.updateMyTask)
  .delete(authController.protect, taskController.deleteMyTask);
router.post(
  "/:id/comment",
  authController.protect,
  taskController.CreateComment
);
router.patch("/share/:id", authController.protect, taskController.ShareTo);
router.route("/shared/me").get(authController.protect, taskController.getshare);

router.use(checkRole("admin"));
router
  .route("/admin")
  .get(authController.protect,schemaValidator(getTasks), taskController.getAllTask)
  .post(authController.protect,schemaValidator(createTask), taskController.CreateTask);

router
  .route("/admin/:id")
  .get(authController.protect,schemaValidator(getTasks), taskController.getTaskById)
  .put(authController.protect,schemaValidator(updateTask), taskController.UpdateTask)
  .delete(authController.protect, taskController.DeleteTask);
module.exports = router;
