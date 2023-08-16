const express = require("express");
const feedbackController = require("../controllers/feedback.controller");

const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");

const feedbackRouter = express.Router();

feedbackRouter.get("/", feedbackController.getAllFeedbackByExaminationId);
feedbackRouter.post(
  "/",
  authenticate,
  authorize(["PATIENT"]),
  feedbackController.addFeedbackByPatient
);

feedbackRouter.get(
  "/check-condition-feedback",
  authenticate,
  authorize(["PATIENT"]),
  feedbackController.checkConditionFeedbackOfPatient
);

module.exports = feedbackRouter;
