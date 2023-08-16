const categoryService = require("../services/category.service");

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategoryService();

    return res.status(200).send(categories);
  } catch (error) {
    return res.status(500).send({
      statusCode: 500,
      message: error.message,
    });
  }
};

module.exports = {
  getAllCategories,
};
