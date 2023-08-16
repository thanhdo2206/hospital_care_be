const { MedicalExamination, TimeSlot, sequelize } = require("../models/index");

const updateStatusTimeSlotService = async (timeSlotId) => {
  try {
    const timeSlotUpdate = await TimeSlot.update(
      { statusTimeSlot: true },
      {
        where: { id: timeSlotId },
      }
    );
    return timeSlotUpdate;
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
};

const getAllTimeSlotOfDoctorCurrentWeekService = async (doctorId) => {
  try {
    const [results] = await sequelize.query(
      `SELECT * FROM TimeSlots WHERE doctorId =${doctorId}  and YEARWEEK(startTime) = YEARWEEK(NOW());`
    );

    return results;
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
};

const getDetailTimeSlotService = async (timeSlotId) => {
  try {
    const timeSlot = await TimeSlot.findOne({
      where: { id: timeSlotId },
    });

    const medicalExamination = await MedicalExamination.findOne({
      where: { id: timeSlot.examinationId },
    });

    return {...timeSlot.toJSON(), medicalExamination};
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
};

const addAllTimeSlotService = async (arrTimeSlot, doctorId) => {
  try {
    const examination = await MedicalExamination.findOne({
      where: { doctorId },
    });

    const arrTimeSlotInput = arrTimeSlot.map((timeSlot) => {
      return { ...timeSlot, examinationId: examination.id, doctorId };
    });

    const listNewTimeSlot = await TimeSlot.bulkCreate(arrTimeSlotInput);

    return listNewTimeSlot;
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
};

const editTimeSlotService = async (timeSlot, timeSlotId) => {
  try {
    await TimeSlot.update(timeSlot, { where: { id: timeSlotId } });
    const timeSlotUpdated = await TimeSlot.findOne({
      where: { id: timeSlotId },
    });

    return timeSlotUpdated;
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
};

const deleteTimeSlotService = async (timeSlotId) => {
  try {
    await TimeSlot.destroy({
      where: { id: timeSlotId },
    });

    return {
      statusCode: 200,
      message: "Delete time slot succesfully",
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
};

module.exports = {
  updateStatusTimeSlotService,
  getAllTimeSlotOfDoctorCurrentWeekService,
  getDetailTimeSlotService,
  addAllTimeSlotService,
  editTimeSlotService,
  deleteTimeSlotService,
};
