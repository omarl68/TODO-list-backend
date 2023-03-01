const express = require("express");
const router = express.Router();


const userRouter = require("./userRoutes");
const taskRouter = require("./taskRoutes");
router.use("/api/v1/users", userRouter);
router.use("/api/v1/tasks", taskRouter);


module.exports = router;
