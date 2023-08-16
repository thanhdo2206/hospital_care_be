const {
  Appointment,
  User,
  TimeSlot,
  MedicalExamination,
} = require("../models/index");
const timeSlotService = require("./timeSlot.service");
const emailService = require("./email.service");

const createAppointmentService = async (dataBookAppointment) => {
  try {
    const newAppointment = await Appointment.create({ ...dataBookAppointment });
    await timeSlotService.updateStatusTimeSlotService(
      dataBookAppointment.timeSlotId
    );
    return newAppointment;
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
};

const getAllAppointmentOfDoctorService = async (
  doctorId,
  pageableParameters
) => {
  try {
    const { pageIndex, size, appointmentStatus } = pageableParameters;
    const pageable = await Appointment.findAndCountAll({
      where: { doctorId, status: appointmentStatus },
      offset: (+pageIndex - 1) * size,
      limit: +size,
      include: [
        {
          model: User,
          as: "patient",
          required: true,
          attributes: { exclude: ["password", "emailToken", "statusVerify"] },
        },
        {
          model: TimeSlot,
          required: true,
        },
      ],
    });

    const result = {
      pageIndex: +pageIndex,
      totalPage: Math.ceil(pageable.count / size),
      listAppointment: pageable.rows,
    };

    return result;
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
};

const getAllAppointmentSpecificPatientOfDoctorService = async (
  doctorId,
  patientId
) => {
  try {
    const result = await Appointment.findAll({
      where: { doctorId, patientId },
      include: [
        {
          model: User,
          as: "patient",
          required: true,
          // attributes: [],
        },
        {
          model: TimeSlot,
          required: true,
        },
      ],
    });

    const medicalExamination = await MedicalExamination.findOne({
      where: { doctorId },
    });

    return {listAppointment:result,medicalExamination};
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
};

const changeStatusAppointmentByDoctorService = async (
  doctorId,
  appointmentId,
  appointmentStatus
) => {
  try {
    await Appointment.update(
      { status: appointmentStatus },
      {
        where: { id: appointmentId, doctorId },
      }
    );

    const appointmentUpdated = await Appointment.findOne({
      where: { id: appointmentId },
      include: [
        {
          model: User,
          as: "patient",
          required: true,
        },
        {
          model: User,
          as: "doctor",
          required: true,
        },
        {
          model: TimeSlot,
          required: true,
        },
      ],
    });

    // await emailService.sendEmailNotificationAppointmentService(
    //   appointmentUpdated
    // );

    return appointmentUpdated;
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
};

module.exports = {
  createAppointmentService,
  getAllAppointmentOfDoctorService,
  getAllAppointmentSpecificPatientOfDoctorService,
  changeStatusAppointmentByDoctorService,
};
