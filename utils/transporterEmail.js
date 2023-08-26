const nodemailer = require("nodemailer");

const createTransporterEmail = () => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  return transporter;
};

module.exports = {
  createTransporterEmail,
};
