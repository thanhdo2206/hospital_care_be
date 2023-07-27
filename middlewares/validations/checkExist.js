const bcrypt = require("bcryptjs");
const { User } = require("../../models/index");
const emailValidator = require("deep-email-validator");

const checkExist = (Model) => {
  return async (req, res, next) => {
    const { id } = req.params;

    const dataFind = await Model.findOne({
      where: { id },
    });

    if (dataFind) {
      next();
    } else res.status(404).send("Not found !");
  };
};

const checkExistEmail = async (req, res, next) => {
  const { email } = req.body;

  const dataFind = await User.findOne({
    where: { email },
  });

  if (dataFind) {
    return res
      .status(409)
      .send({ statusCode: 409, message: "Email already exists !" });
  }
  next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  const { valid, reason, validators } = await emailValidator.validate(email);
  if (valid) return next();

  return res.status(401).send({
    statusCode: 401,
    message: "Please provide a valid email address !",
    reason: validators[reason].reason,
  });
};

const checkAccountLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    return res
      .status(401)
      .send({ statusCode: 401, message: "Email or password not valid !" });
  }

  const isCorrectPass = bcrypt.compareSync(password, user.password);

  if (isCorrectPass) {
    req.user = user.toJSON();

    return next();
  }

  res
    .status(401)
    .send({ statusCode: 401, message: "Email or password not valid !" });
};

const checkVerifyEmail = (req, res, next) => {
  const { statusVerify } = req.user;
  if (statusVerify) return next();

  return res
    .status(401)
    .send({ statusCode: 401, message: "Please verify your email !" });
};

module.exports = {
  checkExistEmail,
  checkAccountLogin,
  checkExist,
  validateEmail,
  checkVerifyEmail,
};
