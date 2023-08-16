const { Category } = require("../models/index");

const getAllCategoryService = async () => {
  try {
    const categories = await Category.findAll();

    return categories;
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
};

module.exports = {
  getAllCategoryService,
};
