const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const { User, sequelize } = require("../models/index");
const {
  generateAccessToken,
  generateRefresshToken,
} = require("../utils/generateTokens");

const createAccountPatientService = async (dataRegister) => {
  try {
    const { email, password } = dataRegister;

    //mã hóa pass
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const avatarUrl = gravatar.url(email);
    const data = { ...dataRegister, avatar: avatarUrl, password: hashPassword };

    const newUser = await User.create(data);
    return newUser;
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
};

const loginService = (user) => {
  const { id, email, role } = user;
  const payload = {
    id,
    email,
    role,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefresshToken(payload);

  return { accessToken, refreshToken };
};

const refreshTokenService = async (refreshToken) => {
  const token = refreshToken.split(" ")[1];

  const decode = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

  try {
    const { id, email } = decode;
    const user = await User.findOne({
      where: { id, email },
    });

    if (!user)
      return { statusCode: 401, message: "Refresh token is not valid" };

    const payload = { id: user.id, email: user.email, role: user.role };

    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefresshToken(payload);

    return { newAccessToken, newRefreshToken };
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
};

const getCurrentUserService = async (userId) => {
  try {
    const user = await User.findOne({
      where: { id: userId },
    });

    return user.toJSON();
  } catch (error) {
    return error;
  }
};

module.exports = {
  createAccountPatientService,
  loginService,
  refreshTokenService,
  getCurrentUserService,
};
