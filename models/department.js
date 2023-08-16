"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ MedicalExamination }) {
      // define association here
      this.hasMany(MedicalExamination, { foreignKey: "departmentId" });
    }
  }
  Department.init(
    {
      name: DataTypes.STRING,
      backgroundImage: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Department",
    }
  );
  return Department;
};
