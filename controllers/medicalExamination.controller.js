const medicalExaminationService = require("../services/medicalExamination.service");

const getAllMedicalExamination = async (req, res) => {
  try {
    const listMedical =
      await medicalExaminationService.getAllMedicalExaminationService();
    res.status(200).send(listMedical);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDetailMedicalExamination = async (req, res) => {
  try {
    const { medicalId } = req.params;

    const medical =
      await medicalExaminationService.getDetailMedicalExaminationService(
        medicalId
      );
    res.status(200).send(medical);
  } catch (error) {
    res.status(500).send(error);
  }
};

const filterMedicalExaminationByCategoryAndPrice = async (req, res) => {
  try {
    const { categories, minPrice, maxPrice } = req.query;

    const arrCategory = categories ? categories.split(",") : [];

    if (!minPrice && !maxPrice) {
      const listMedical =
        categories.length == 0
          ? await medicalExaminationService.getAllMedicalExaminationService()
          : await medicalExaminationService.filterMedicalExaminationServiceByCategory(
              arrCategory
            );

      return res.status(200).send(listMedical);
    }

    if (arrCategory.length == 0) {
      const listMedical =
        await medicalExaminationService.filterMedicalExaminationServiceByPrice(
          minPrice,
          maxPrice
        );

      return res.status(200).send(listMedical);
    }

    const result =
      await medicalExaminationService.filterMedicalExaminationServiceByCategoryAndPrice(
        arrCategory,
        minPrice,
        maxPrice
      );

    return res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const searchNameMedicalExamination = async (req, res) => {
  try {
    const { name } = req.query;
    console.log(name);
    const listMedical =
      await medicalExaminationService.searchNameMedicalExaminationService(name);

    res.status(200).send(listMedical);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllMedicalExamination,
  getDetailMedicalExamination,
  filterMedicalExaminationByCategoryAndPrice,
  searchNameMedicalExamination,
};
