const feedbackService = require("../services/feedback.service");

const getAllFeedbackByExaminationId = async (req, res) => {
  try {
    const { examinationId } = req.query;
    const listFeedback =
      await feedbackService.getAllFeedbackByExaminationIdService(examinationId);

    return res.status(200).send(listFeedback);
  } catch (error) {
    return res.status(500).send({
      statusCode: 500,
      message: error.message,
    });
  }
};

const addFeedbackByPatient = async (req, res) => {
  try {
    const patientId = req.user.id;
    const newFeedback = await feedbackService.addFeedbackByPatientService(
      patientId,
      req.body
    );

    return res.status(201).send(newFeedback);
  } catch (error) {
    return res.status(500).send({
      statusCode: 500,
      message: error.message,
    });
  }
};

const checkConditionFeedbackOfPatient = async (req, res) => {
  try {
    const { doctorId } = req.query;
    const patientId = req.user.id
    const condition =
      await feedbackService.checkConditionFeedbackOfPatientService(
        doctorId,
        patientId
      );

    return res.status(200).send(condition);
  } catch (error) {
    return res.status(500).send({
      statusCode: 500,
      message: error.message,
    });
  }
};


module.exports = {
  getAllFeedbackByExaminationId,
  addFeedbackByPatient,
  checkConditionFeedbackOfPatient,
};
