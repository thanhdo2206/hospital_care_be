"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, TimeSlot }) {
      // define association here
      this.belongsTo(User, { foreignKey: "doctorId", as: "doctor" });
      this.belongsTo(User, { foreignKey: "patientId", as: "patient" });

      this.belongsTo(TimeSlot, { foreignKey: "timeSlotId" });
    }
  }
  Appointment.init(
    {
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Appointment",
    }
  );
  return Appointment;
};
