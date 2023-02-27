const express = require("express");
const taskController = require("../controllers/taskController");
const authController = require("../controllers/authController");
const router = express.Router();
const checkRole = require("../controllers/checkRole");

router.use(checkRole("user", "admin"));
router
  .route("/")
  .get(authController.protect, taskController.getMyTask)
  .post(authController.protect, taskController.CreateTask);

router
  .route("/:id")
  .get(authController.protect, taskController.getMyTaskById)
  .put(authController.protect, taskController.updateMyTask)
  .delete(authController.protect, taskController.deleteMyTask);
router
  .post("/:id/comment",authController.protect, taskController.CreateComment)


router.use(checkRole("admin"));
router
  .route("/admin")
  .get(authController.protect, taskController.getAllTask)
  .post(authController.protect, taskController.CreateTask);

router
  .route("/admin/:id")
  .get(authController.protect, taskController.getTaskById)
  .put(authController.protect, taskController.UpdateTask)
  .delete(authController.protect, taskController.DeleteTask);
module.exports = router;
