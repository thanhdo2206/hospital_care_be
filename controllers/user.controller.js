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
    const { accessToken, refreshToken } = userService.loginService(req.user);
    console.log("api login");
    res.cookie(ACCESS_TOKEN, accessToken, {
      // maxAge: 20 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.cookie(REFRESH_TOKEN, refreshToken, {
      // maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    const { password, emailToken, ...dataUserResponse } = req.user;

    return res.status(200).send({
      auth: true,
      message: "Logged in successfully",
      user: dataUserResponse,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const requestRefreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return res.status(401).json("You're not authenticated");
  console.log("refreshToken requestRefreshToken", refreshToken);
  try {
    const response = await userService.refreshTokenService(refreshToken);
    const { newAccessToken, newRefreshToken } = response;
    if (!newAccessToken) return res.send(response);

    res.cookie(ACCESS_TOKEN, newAccessToken, {
      // maxAge: 20 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.cookie(REFRESH_TOKEN, newRefreshToken, {
      // maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).send("Refresh token successfull");
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getCurrentUser = async (req, res) => {
  console.log("getCurrentUser api");
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

// const sendEmail = async (req, res) => {
//   const email = "dovanducthanh@gmail.com";
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false,
//       auth: {
//         user: process.env.EMAIL_APP,
//         pass: process.env.EMAIL_APP_PASSWORD,
//       },
//     });

//     await transporter.sendMail({
//       from: '"Hospital Care" <hospitalcarethanh@gmail.com>',
//       to: email,
//       subject: "Test Nodemailer",
//       html: `
//         <h3>Hello Thanh</h3>
//         <p>You received this email because you booked an online medical appointment on Hospital Care</p>
//         <p>Information to schedule an appointment:</p>
//         <div><b>Time: 10am</b></div>
//         <div><b>Doctor: Do Van Duc Thanh</b></div>

//       `,
//     });
//     res.send("Email has been sent successfully");
//   } catch (error) {
//     res.send("email not sent");
//     console.log(error);
//   }
// };

module.exports = { register, login, requestRefreshToken, getCurrentUser };
