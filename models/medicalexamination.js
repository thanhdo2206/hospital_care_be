"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MedicalExamination extends Model {
    static associate({ TimeSlot, User, Department, Category, Feedback }) {
      // define association here
      this.hasMany(TimeSlot, { foreignKey: "examinationId", as: "timeSlots" });
      this.belongsTo(User, { foreignKey: "doctorId" });
      this.belongsTo(Department, { foreignKey: "departmentId" });

      this.belongsToMany(Category, {
        through: "CategoryMedicalExamination",
        foreignKey: "examinationId",
      });

      this.hasMany(Feedback, { foreignKey: "examinationId" });
    }
  }
  MedicalExamination.init(
    {
      examinationPrice: DataTypes.BIGINT,
      title: DataTypes.STRING,
      shortDescription: DataTypes.TEXT,
      description: DataTypes.TEXT,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "MedicalExamination",
    }
  );
  return MedicalExamination;
};
