const nodemailer = require("nodemailer");
const { User } = require("../models/index");
const {
  createContentEmailNotificationAppointment,
} = require("../utils/createContentEmail");

const { ACCEPT_APPOINTMENT } = require("../utils/constant");

const sendVerifyEmail = async (emailToken, email, userId) => {
  const url = `${process.env.URL_REACT}/verify-email/${emailToken}/${userId}`;
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_APP,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: '"Hospital Care" <hospitalcarethanh@gmail.com>',
      to: email,
      subject: "Veify Email",
      html: `
        Please click this email to confirm your email: <a href="${url}">${url}</a>

      `,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
    return {
      statusCode: 500,
      message: error.message,
    };
  }
};

const verifyEmailService = async (emailToken, userId) => {
  try {
    const user = await User.findOne({
      where: { emailToken, id: userId, statusVerify: false },
    });

    if (!user) {
      return {
        statusCode: 401,
        message: "Account has been activated or does not exist!",
      };
    }

    await user.update({ statusVerify: true });
    return {
      statusCode: 200,
      message: "Verify email succeed!",
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: error.message,
    };
  }
};

const sendEmailNotificationAppointmentService = async (appointment) => {
  try {
    const patient = appointment.patient;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_APP,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const contentEmail = createContentEmailNotificationAppointment(appointment);
    const titleEmail =
      appointment.status === ACCEPT_APPOINTMENT
        ? "Email notification of acceptance of medical appointment"
        : "Email notification of cancellation of medical appointment";
    await transporter.sendMail({
      from: '"Hospital Care" <hospitalcarethanh@gmail.com>',
      to: patient.email,
      subject: titleEmail,
      html: contentEmail,
    });
    console.log("Email has been sent successfully");
  } catch (error) {
    console.log(error);
    return "email not sent";
  }
};

module.exports = {
  sendVerifyEmail,
  verifyEmailService,
  sendEmailNotificationAppointmentService,
};
