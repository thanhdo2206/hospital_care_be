const express = require("express");
const userController = require("../controllers/user.controller");
const {
  checkAccountLogin,
  checkExistEmail,
  validateEmail,
  checkVerifyEmail,
} = require("../middlewares/validations/checkExist");
const { authenticate } = require("../middlewares/auth/authenticate");
const userRouter = express.Router();

userRouter.post(
  "/register",
  checkExistEmail,
  validateEmail,
  userController.register
);

userRouter.post(
  "/login",
  checkAccountLogin,
  checkVerifyEmail,
  userController.login
);

userRouter.post("/refresh-token", userController.requestRefreshToken);

userRouter.get("/", authenticate, userController.getCurrentUser);

module.exports = userRouter;
