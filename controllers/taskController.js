const Task = require("../models/taskModel");
const AppError = require("AppError");
const catchAsync = require("../utils/catchAsync.js");
const Task = require("../models/taskModel");

exports.getAllTask = catchAsync(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({
    status: "success",
    results: tasks.length,
    tasks,
  });
});

exports.getTaskById = catchAsync(async (req, res, next) => {
  const tasks = await Task?.findById(req.params.id);
  if (!tasks) {
    return next(new AppError("tasks not Found ! try Again .", 404));
  }
  res.status(200).json({
    status: "success",
    tasks: tasks,
  });
});
exports.CreateTask = catchAsync(async (req, res) => {
  const task = await Task.create(req.body);

  return res.status(201).json({
    status: "success",
    data: { task },
  });
});
