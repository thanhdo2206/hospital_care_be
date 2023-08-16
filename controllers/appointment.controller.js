const appointmentService = require("../services/appointment.service");

const createAppointment = async (req, res) => {
  try {
    const patient = req.user;

    const { doctorId, timeSlotId } = req.body;
    const dataBookAppointment = { patientId: patient.id, doctorId, timeSlotId };

    const newAppointment = await appointmentService.createAppointmentService(
      dataBookAppointment
    );

    res.status(201).send(newAppointment);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllAppointmentOfDoctor = async (req, res) => {
  try {
    const doctor = req.user;

    const result = await appointmentService.getAllAppointmentOfDoctorService(
      doctor.id,
      req.query
    );

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllAppointmentSpecificPatientOfDoctor = async (req, res) => {
  try {
    const doctor = req.user;
    const { patientId } = req.query;

    const result =
      await appointmentService.getAllAppointmentSpecificPatientOfDoctorService(
        doctor.id,
        patientId
      );

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const changeStatusAppointmentByDoctor = async (req, res) => {
  try {
    const doctor = req.user;
    const { appointmentId } = req.params;
    const { status } = req.body;

    const appointmentUpdated =
      await appointmentService.changeStatusAppointmentByDoctorService(
        doctor.id,
        appointmentId,
        status
      );

    res.status(200).send(appointmentUpdated);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createAppointment,
  getAllAppointmentOfDoctor,
  getAllAppointmentSpecificPatientOfDoctor,
  changeStatusAppointmentByDoctor,
};
