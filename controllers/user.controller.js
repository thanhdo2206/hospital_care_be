const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const userService = require("../services/user.service");
const emailService = require("../services/email.service");
const { ACCESS_TOKEN, REFRESH_TOKEN } = require("../utils/constant");

const register = async (req, res) => {
  try {
    const { email } = req.body;
    const emailToken = uuidv4();
    const data = { ...req.body, emailToken };

    const newUser = await userService.createAccountPatientService(data);
    await emailService.sendVerifyEmail(emailToken, email, newUser.id);

    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  try {
    const { accessToken } = userService.loginService(req.user);
    console.log("api login");

    const { password, emailToken, ...dataUserResponse } = req.user;

    return res.status(200).send({
      auth: true,
      message: "Logged in successfully",
      user: dataUserResponse,
      accessToken,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userService.getCurrentUserService(userId);
    if (!user)
      return res
        .status(409)
        .send({ statusCode: 409, message: "User does not exist !" });
    const { password, emailToken, statusVerify, ...otherUser } = user;
    // console.log("user getcurrent user method", otherUser);
    return res.status(200).send(otherUser);
  } catch (error) {
    return res.status(500).send({
      statusCode: 500,
      message: error.message,
    });
  }
};

const updateProfileUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const userUpdated = await userService.updateProfileUserService(
      userId,
      req.body
    );

    return res.status(200).send(userUpdated);
  } catch (error) {
    return res.status(500).send({
      statusCode: 500,
      message: error.message,
    });
  }
};

const uploadAvatarUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const fileData = req.file;

    const result = await userService.uploadAvatarUserService(fileData, userId);

    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send({
      statusCode: 500,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  updateProfileUser,
  uploadAvatarUser,
};
