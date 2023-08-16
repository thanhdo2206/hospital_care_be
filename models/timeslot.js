"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TimeSlot extends Model {
    static associate({ MedicalExamination, User, Appointment }) {
      // define association here
      this.belongsTo(MedicalExamination, {
        foreignKey: "examinationId",
        as: "timeSlots",
      });
      this.belongsTo(User, { foreignKey: "doctorId" });

      this.hasOne(Appointment, { foreignKey: "timeSlotId" });
    }
  }
  TimeSlot.init(
    {
      startTime: DataTypes.DATE,
      duration: DataTypes.INTEGER,
      statusTimeSlot: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "TimeSlot",
    }
  );
  return TimeSlot;
};
