const timeSlotService = require("../services/timeSlot.service");

const getAllTimeSlotOfDoctorCurrentWeek = async (req, res) => {
  try {
    const doctor = req.user;

    const listTimeSlot =
      await timeSlotService.getAllTimeSlotOfDoctorCurrentWeekService(doctor.id);

    res.status(200).send(listTimeSlot);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDetailTimeSlot = async (req, res) => {
  try {
    const { timeSlotId } = req.params;

    const timeSlot = await timeSlotService.getDetailTimeSlotService(timeSlotId);

    res.status(200).send(timeSlot);
  } catch (error) {
    res.status(500).send(error);
  }
};

const addAllTimeSlot = async (req, res) => {
  try {
    const doctor = req.user;
    const listNewTimeSlot = await timeSlotService.addAllTimeSlotService(
      req.body,
      doctor.id
    );

    res.status(201).send(listNewTimeSlot);
  } catch (error) {
    res.status(500).send(error);
  }
};

const editTimeSlot = async (req, res) => {
  try {
    const { timeSlotId } = req.params;

    const timeSlotUpdated = await timeSlotService.editTimeSlotService(
      req.body,
      timeSlotId
    );

    res.status(200).send(timeSlotUpdated);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteTimeSlot = async (req, res) => {
  try {
    const { timeSlotId } = req.params;

    const result = await timeSlotService.deleteTimeSlotService(timeSlotId);

    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllTimeSlotOfDoctorCurrentWeek,
  getDetailTimeSlot,
  addAllTimeSlot,
  editTimeSlot,
  deleteTimeSlot,
};
