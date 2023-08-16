const express = require("express");
const timeSlotController = require("../controllers/timeSlot.controller");

const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");
const timeSlotRouter = express.Router();

timeSlotRouter.get(
  "/doctor",
  authenticate,
  authorize(["DOCTOR"]),
  timeSlotController.getAllTimeSlotOfDoctorCurrentWeek
);

timeSlotRouter.get("/:timeSlotId", timeSlotController.getDetailTimeSlot);
timeSlotRouter.post(
  "/",
  authenticate,
  authorize(["DOCTOR"]),
  timeSlotController.addAllTimeSlot
);

timeSlotRouter.patch(
  "/:timeSlotId",
  authenticate,
  authorize(["DOCTOR"]),
  timeSlotController.editTimeSlot
);

timeSlotRouter.delete(
  "/:timeSlotId",
  authenticate,
  authorize(["DOCTOR"]),
  timeSlotController.deleteTimeSlot
);
module.exports = timeSlotRouter;
