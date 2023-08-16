"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ TimeSlot, MedicalExamination, Appointment, Feedback }) {
      // define association here
      this.hasMany(TimeSlot, { foreignKey: "doctorId" });
      this.hasOne(MedicalExamination, { foreignKey: "doctorId" });

      this.hasMany(Appointment, { foreignKey: "doctorId", as: "doctor" });
      this.hasMany(Appointment, { foreignKey: "patientId", as: "patient" });

      this.hasMany(Feedback, { foreignKey: "patientId", as: "patientInformation" });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      role: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
      avatar: DataTypes.STRING,
      age: DataTypes.INTEGER,
      statusVerify: DataTypes.BOOLEAN,
      emailToken: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
