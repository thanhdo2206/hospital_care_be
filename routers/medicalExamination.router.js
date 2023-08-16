const express = require("express");
const medicalExaminationController = require("../controllers/medicalExamination.controller");

const medicalExaminationRouter = express.Router();

medicalExaminationRouter.get(
  "/",
  medicalExaminationController.getAllMedicalExamination
);

medicalExaminationRouter.get(
  "/:medicalId",
  medicalExaminationController.getDetailMedicalExamination
);
medicalExaminationRouter.get(
  "/filter/category_price",
  medicalExaminationController.filterMedicalExaminationByCategoryAndPrice
);

medicalExaminationRouter.get(
  "/search/name_doctor",
  medicalExaminationController.searchNameMedicalExamination
);

module.exports = medicalExaminationRouter;

