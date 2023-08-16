"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, MedicalExamination }) {
      // define association here
      this.belongsTo(User, {
        foreignKey: "patientId",
        as: "patientInformation",
      });
      this.belongsTo(MedicalExamination, {
        foreignKey: "examinationId",
      });
    }
  }
  Feedback.init(
    {
      commentText: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Feedback",
    }
  );
  return Feedback;
};
