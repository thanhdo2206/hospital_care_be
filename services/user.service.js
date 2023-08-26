const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const { User, sequelize } = require("../models/index");
const { generateAccessToken } = require("../utils/generateTokens");
const { getPublicIdCloudinary } = require("../utils/cutPath");
const cloudinary = require("cloudinary").v2;

const createAccountPatientService = async (dataRegister) => {
  try {
    const { email, password } = dataRegister;

    //mã hóa pass
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const avatarUrl = gravatar.url(email);
    const data = { ...dataRegister, password: hashPassword };

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

  return { accessToken };
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

const updateProfileUserService = async (userId, dataUpdate) => {
  try {
    await User.update(dataUpdate, {
      where: { id: userId },
    });

    const userUpdated = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ["password", "emailToken", "statusVerify"] },
    });

    return userUpdated;
  } catch (error) {
    return error;
  }
};

const uploadAvatarUserService = async (fileData, userId) => {
  try {
    const user = await User.findOne({
      where: { id: userId },
    });

    if (user.avatar) {
      const publicIdCloudinary = getPublicIdCloudinary(user.avatar);
      await cloudinary.uploader.destroy(publicIdCloudinary);
    }

    await User.update(
      { avatar: fileData.path },
      {
        where: { id: userId },
      }
    );

    const userUpdated = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ["password", "emailToken", "statusVerify"] },
    });

    return userUpdated;
  } catch (error) {
    return error;
  }
};

module.exports = {
  createAccountPatientService,
  loginService,
  getCurrentUserService,
  updateProfileUserService,
  uploadAvatarUserService,
};
