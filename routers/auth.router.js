const express = require("express");
const authController = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/verify-email", authController.verifyEmail);

module.exports = authRouter;
