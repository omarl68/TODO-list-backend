const fs = require('fs');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

/* const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
); */

const filterObj = (obj, ...allowedFileds) => {
  const newObj = {};
  Object.keys(obj);
  forEach((el) => {
    if (allowedFileds.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

//router handeler

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    users,
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const users = await User?.findById(req.params.id);
  if (!users) {
    return next(new AppError('User not Found ! try Again .', 404));
  }
  res.status(200).json({
    status: 'success',
    data: { users: users },
  });
});
exports.addUser = catchAsync(async (req, res) => {
  const user = await User.create(req.body);

  return res.status(200).json({
    status: 'success',
    data: { user },
  });
});
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates.please use /updateMyPassword',
        400
      )
    );
  }
  const filteredBody = filterObj(req.body, 'name', 'email');
  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    user: updateUser,
  });
});

exports.UpdateUser = catchAsync(async (req, res) => {
  const users = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });;
  if (!users) {
    return next(new AppError('User not Found ! try Again .', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      users: 'Update success',
    },
  });
});

exports.DeleteUser = catchAsync(async (req, res) => {
  const users = await User.findByIdAndDelete(req.params.id);
  if (!users) {
    return next(new AppError('User not Found ! try Again .', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
