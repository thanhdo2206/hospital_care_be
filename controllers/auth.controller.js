const emailService = require("../services/email.service");

const verifyEmail = async (req, res) => {
  try {
    const { emailToken, userId } = req.body;
    let response = await emailService.verifyEmailService(emailToken, userId);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = { verifyEmail };
