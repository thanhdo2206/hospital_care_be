const { Op } = require("sequelize");
const {
  MedicalExamination,
  TimeSlot,
  Appointment,
  Category,
  Department,
  sequelize,
} = require("../models/index");

const getAllMedicalExaminationService = async () => {
  try {
    const listMedical = await MedicalExamination.findAll({
      include: [
        {
          model: TimeSlot,
          as: "timeSlots",
          required: true,
        },
        {
          model: Department,
          required: true,
        },
      ],
      order: [["id", "ASC"]],
    });
    return listMedical;
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
};

const getDetailMedicalExaminationService = async (medicalId) => {
  try {
    const medical = await MedicalExamination.findOne({
      where: { id: medicalId },
      include: [
        {
          model: TimeSlot,
          as: "timeSlots",
          required: true,
        },
        {
          model: Department,
          required: true,
        },
      ],
    });
    return medical;
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
};

const filterMedicalExaminationServiceByCategoryAndPrice = async (
  categories,
  minPrice,
  maxPrice
) => {
  try {
    const listMedical = await MedicalExamination.findAll({
      where: { examinationPrice: { [Op.between]: [minPrice, maxPrice] } },
      include: [
        {
          model: Category,
          required: true,
          attributes: [],
          where: { name: categories },
        },
        {
          model: TimeSlot,
          as: "timeSlots",
          required: true,
        },
        {
          model: Department,
          required: true,
        },
      ],
    });
    return listMedical;
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
};

const filterMedicalExaminationServiceByCategory = async (categories) => {
  try {
    const listMedical = await MedicalExamination.findAll({
      include: [
        {
          model: Category,
          required: true,
          attributes: [],
          where: { name: categories },
        },
        {
          model: TimeSlot,
          as: "timeSlots",
          required: true,
        },
        {
          model: Department,
          required: true,
        },
      ],
    });
    return listMedical;
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
};

const filterMedicalExaminationServiceByPrice = async (minPrice, maxPrice) => {
  try {
    const listMedical = await MedicalExamination.findAll({
      where: { examinationPrice: { [Op.between]: [minPrice, maxPrice] } },
      include: [
        {
          model: TimeSlot,
          as: "timeSlots",
          required: true,
        },
        {
          model: Department,
          required: true,
        },
      ],
    });
    return listMedical;
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
};

const searchNameMedicalExaminationService = async (name) => {
  try {
    const listMedical = await MedicalExamination.findAll({
      where: { title: { [Op.like]: `%${name}` } },
      include: [
        {
          model: TimeSlot,
          as: "timeSlots",
          required: true,
        },
        {
          model: Department,
          required: true,
        },
      ],
    });
    return listMedical;
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
};

module.exports = {
  getAllMedicalExaminationService,
  getDetailMedicalExaminationService,
  filterMedicalExaminationServiceByCategoryAndPrice,
  filterMedicalExaminationServiceByCategory,
  filterMedicalExaminationServiceByPrice,
  searchNameMedicalExaminationService,
};
