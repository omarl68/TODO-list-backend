const express = require("express");
const router = express.Router();

const authRouter = require("./authRoutes");
const userRouter = require("./userRoutes");
const taskRouter = require("./taskRoutes");
const commentRouter = require("./commentsRoutes");
router.use("/api/v1", authRouter);
router.use("/api/v1/users", userRouter);
router.use("/api/v1/tasks", taskRouter);
router.use("/api/v1/tasks", commentRouter);

module.exports = router;
