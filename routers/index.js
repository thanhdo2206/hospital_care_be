const express = require("express");

const userRouter = require("./user.router");
const authRouter = require("./auth.router");
const medicalExaminationRouter = require("./medicalExamination.router");
const appointmentRouter = require("./appointment.router");
const timeSlotRouter = require("./timeSlot.router");
const feedbackRouter = require("./feedback.router");
const categoryRouter = require("./category.router");

const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/medical_examinations", medicalExaminationRouter);
rootRouter.use("/appointments", appointmentRouter);
rootRouter.use("/time_slots", timeSlotRouter);
rootRouter.use("/feedbacks", feedbackRouter);
rootRouter.use("/categories", categoryRouter);

module.exports = rootRouter;
