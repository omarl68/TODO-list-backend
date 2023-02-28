const Task = require("../models/taskModel");
const User = require("../models/userModel");
const Comment = require("../models/commentModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync.js");

//user
exports.getMyTask = catchAsync(async (req, res, next) => {
  const createdBy = req.user._id;

  const tasks = await Task?.find({ createdBy });

  if (!tasks || !createdBy) {
    return next(new AppError("tasks not Found ! try Again .", 404));
  }
  res.status(200).json({
    status: "success",
    tasks: tasks,
  });
});

exports.getMyTaskById = catchAsync(async (req, res, next) => {
  const tasks = await Task?.findOne({
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
  const task = await Task.findOneAndUpdate(
    {
      _id: req.params.id,
      createdBy: req.user?._id,
    },
    req.body,
    {
      runValidators: true,
      new: true,
    }
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
  const task = await Task.findOneAndRemove(
    {
      _id: req.params.id,
      createdBy: req.user?._id,
    },
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );
  if (!task) {
    return next(new AppError("task not Found ! try Again .", 404));
  }

  return res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.CreateComment = catchAsync(async (req, res) => {
  req.body.creator = req.user?._id;
  const comment = await Comment.create(req.body);
  const newTask = await Task.findById({
    _id: req.params.id,
  });
  newTask.comments.push(comment._id);
  await newTask.save();
  res.status(200).json({
    status: "success",
    comment,
  });
});
exports.ShareTo = catchAsync(async (req, res, next) => {
  console.log(req.body.share);
  const user = await User.findById(req.body.share);
  if (!user) {
    return next(new AppError("user not Found ! try Again .", 404));
  }
  const task = await Task.findByIdAndUpdate(req.params.id, req.body);
  if (!task) {
    return next(new AppError("task not Found ! try Again .", 404));
  }
  res.status(200).json({
    status: "success",
    task,
  });
});
exports.getshare = catchAsync(async (req, res) => {
  const tasks = await Task.find({
    share: req.user?._id,
  });
  console.log(tasks);
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
  req.body.createdBy = req.user.id;
  const task = await Task.create(req.body);

  return res.status(201).json({
    status: "success",
    data: { task },
  });
});

exports.UpdateTask = catchAsync(async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  if (!task) {
    return next(new AppError("task not Found ! try Again .", 404));
  }

  return res.status(200).json({
    status: "success",
    task,
  });
});
exports.DeleteTask = catchAsync(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    return next(new AppError("Task not Found ! try Again .", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
