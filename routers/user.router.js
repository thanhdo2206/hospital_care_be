const express = require("express");
const userController = require("../controllers/user.controller");
const {
  checkAccountLogin,
  checkExistEmail,
  validateEmail,
  checkVerifyEmail,
} = require("../middlewares/validations/checkExist");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");

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

userRouter.get("/", authenticate, userController.getCurrentUser);
userRouter.patch(
  "/",
  authenticate,
  authorize(["PATIENT", "DOCTOR"]),
  userController.updateProfileUser
);

module.exports = userRouter;
