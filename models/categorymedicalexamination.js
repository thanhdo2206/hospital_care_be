"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CategoryMedicalExamination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ MedicalExamination, Category }) {
      // define association here
      this.belongsTo(MedicalExamination, { foreignKey: "examinationId" });
      this.belongsTo(Category, { foreignKey: "categoryId" });

    }
  }
  CategoryMedicalExamination.init(
    {},
    {
      sequelize,
      modelName: "CategoryMedicalExamination",
    }
  );
  return CategoryMedicalExamination;
};
