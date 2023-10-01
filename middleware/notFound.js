const AppError = require("../utilis/appError");
exports.notFound = (req, res, next) => {
  next(new AppError(`can't find this route`, 400));
};
