module.exports = (role) => (req, res, next) => {
  if (req.role && req.role !== role) {
    return res.status(403).json({
      status: "fail",
      message: "you are not authorized to perform this action !",
    });
  }

  next();
};
