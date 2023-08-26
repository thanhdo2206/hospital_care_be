const {
  MedicalExamination,
  TimeSlot,
  sequelize,
  User,
  Feedback,
  Appointment,
} = require("../models/index");

const getAllFeedbackByExaminationIdService = async (examinationId) => {
  try {
    const listFeedback = await Feedback.findAll({
      where: { examinationId },
      include: [
        {
          model: User,
          as: "patientInformation",
          required: true,
          attributes: ["avatar","firstName","lastName"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return listFeedback;
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
};

const addFeedbackByPatientService = async (patientId, feedbackPatient) => {
  try {
    const newFeedback = await Feedback.create({
      ...feedbackPatient,
      patientId,
    });

    return newFeedback;
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
};

const checkConditionFeedbackOfPatientService = async (doctorId, patientId) => {
  try {
    const listAppointment = await Appointment.findAll({
      where: { doctorId, patientId,status:1 },
    });

    if (listAppointment.length > 0)
      return {
        statusCode: 200,
        message: "The patient has an appointment with the doctor",
        isBooked: true,
      };

    return {
      statusCode: 404,
      message: "The patient has never booked an appointment with a doctor",
      isBooked: false,
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
};

module.exports = {
  getAllFeedbackByExaminationIdService,
  addFeedbackByPatientService,
  checkConditionFeedbackOfPatientService,
};
