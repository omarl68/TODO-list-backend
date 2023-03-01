const CommentRepo = require("../db/repositories/commentRepo");
const TaskRepo = require("../db/repositories/taskRepo");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync.js");

exports.CreateComment = catchAsync(async (req, res, next) => {
  req.body.creator = req.user?._id;
  const comment = await CommentRepo.create(req.body);
  const newTask = await TaskRepo.findById({
    _id: req.params.id,
  });
  if (!newTask) {
    return next(new AppError("task not Found ! try Again .", 404));
  }
  newTask.comments.push(comment._id);
  await newTask.save();
  res.status(200).json({
    status: "success",
    comment,
  });
});

/* exports.getCommentById = catchAsync(async (req, res, next) => {
  const comment = await CommentRepo.findById(req.params.id);
  if (!comment) {
    return next(new AppError("tasks not Found ! try Again .", 404));
  }
});
 */