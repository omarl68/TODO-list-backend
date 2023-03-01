
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync.js");
const TaskRepo = require("../db/repositories/taskRepo");
const UserRepo = require("../db/repositories/userRepo");


//user
exports.getMyTask = catchAsync(async (req, res, next) => {
  const createdBy = req.user._id;
  const tasks = await TaskRepo.find({ createdBy });

  if (!tasks || !createdBy) {
    return next(new AppError("tasks not Found ! try Again .", 404));
  }
  res.status(200).json({
    status: "success",
    tasks: tasks,
  });
});

exports.getMyTaskById = catchAsync(async (req, res, next) => {
  const tasks = await TaskRepo.findOne({
    _id: req.params.id,
    createdBy: req.user?._id,
  });
  if (!tasks) {
    return next(new AppError("tasks not Found ! try Again .", 404));
  }
  res.status(200).json({
    status: "success",
    tasks: tasks,
  });
});

exports.updateMyTask = catchAsync(async (req, res, next) => {
  const task = await TaskRepo.findByIdAndUpdate(
    {
      _id: req.params.id,
      createdBy: req.user?._id,
    },
    req.body
  );
  if (!task) {
    return next(new AppError("task not Found ! try Again .", 404));
  }

  return res.status(200).json({
    status: "success",
    task,
  });
});

exports.deleteMyTask = catchAsync(async (req, res, next) => {
  const task = await TaskRepo.findByIdAndRemove({
    _id: req.params.id,
    createdBy: req.user?._id,
  });
  if (!task) {
    return next(new AppError("task not Found ! try Again .", 404));
  }

  return res.status(204).json({
    status: "success",
    data: null,
  });
});



exports.ShareTo = catchAsync(async (req, res, next) => {
  
  const user = await UserRepo.findById(req.body.share);
  if (!user) {
    return next(new AppError("user not Found ! try Again .", 404));
  }
  const task = await TaskRepo.findByIdAndUpdate(req.params.id, req.body);
  if (!task) {
    return next(new AppError("task not Found ! try Again .", 404));
  }
  res.status(200).json({
    status: "success",
    task,
  });
});

exports.getshare = catchAsync(async (req, res) => {
  const tasks = await TaskRepo.find({
    share: req.user?._id,
  });
  if (!tasks) {
    return next(new AppError("tasks not Found ! try Again .", 404));
  }
  res.status(200).json({
    status: "success",
    results: tasks.length,
    tasks: tasks,
  });
});
//admin

exports.getAllTask = catchAsync(async (req, res) => {
 const tasks = await TaskRepo.find(); 
  res.status(200).json({
    status: "success",
    results: tasks.length,
    tasks,
  });
});

exports.getTaskById = catchAsync(async (req, res, next) => {
  const tasks = await TaskRepo?.findById(req.params.id);
  if (!tasks) {
    return next(new AppError("tasks not Found ! try Again .", 404));
  }
  res.status(200).json({
    status: "success",
    tasks: tasks,
  });
});
exports.CreateTask = catchAsync(async (req, res) => {
  req.body.createdBy = req.user.id;
  const task = await TaskRepo.create(req.body);

  return res.status(201).json({
    status: "success",
    data: { task },
  });
});

exports.UpdateTask = catchAsync(async (req, res) => {
  const task = await TaskRepo.findByIdAndUpdate(req.params.id, req.body);
  if (!task) {
    return next(new AppError("task not Found ! try Again .", 404));
  }

  return res.status(200).json({
    status: "success",
    task,
  });
});
exports.DeleteTask = catchAsync(async (req, res) => {
  const task = await TaskRepo.findByIdAndDelete(req.params.id);
  if (!task) {
    return next(new AppError("Task not Found ! try Again .", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
