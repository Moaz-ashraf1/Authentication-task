const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/userSchema");
const { request } = require("express");
const AppError = require("../utilis/appError");
const { sentitizeUser } = require("../middleware/sentitizeUser ");

const generateToken = async (user) => {
  const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
    expiresIn: 90 * 24 * 60 * 60, // 90 days
  });

  return token;
};
exports.signup = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = await generateToken(user);

  res.status(201).json({
    status: "success",
    data: sentitizeUser(user),
    token,
  });
});
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    console.log(await bcrypt.compare(password, user.password));

    return next(new AppError("Incorrecte email or password", 401));
  }

  const token = await generateToken(user);

  res.status(200).json({
    status: "success",
    data: sentitizeUser(user),
    token,
  });
});
