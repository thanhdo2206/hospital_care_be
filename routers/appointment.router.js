const express = require("express");
const appointmentController = require("../controllers/appointment.controller");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");

const appointmentRouter = express.Router();

appointmentRouter.post(
  "/book_appointment",
  authenticate,
  authorize(["PATIENT"]),
  appointmentController.createAppointment
);

appointmentRouter.get(
  "/doctor/pageable",
  authenticate,
  authorize(["DOCTOR"]),
  appointmentController.getAllAppointmentOfDoctor
);

appointmentRouter.get(
  "/doctor/patient",
  authenticate,
  authorize(["DOCTOR"]),
  appointmentController.getAllAppointmentSpecificPatientOfDoctor
);

appointmentRouter.get(
  "/patient",
  authenticate,
  authorize(["PATIENT"]),
  appointmentController.getHistoryAppointmentByPatient
);

appointmentRouter.patch(
  "/change_status_appointment/:appointmentId",
  authenticate,
  authorize(["DOCTOR"]),
  appointmentController.changeStatusAppointmentByDoctor
);

module.exports = appointmentRouter;
