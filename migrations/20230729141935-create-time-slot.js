"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TimeSlots", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      startTime: {
        type: Sequelize.DATE,
      },
      duration: {
        type: Sequelize.INTEGER,
      },
      statusTimeSlot: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      examinationId: {
        type: Sequelize.INTEGER,
        references: {
          model: "MedicalExaminations",
          key: "id",
        },
      },
      doctorId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      createdAt: {
        // allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        // allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("TimeSlots");
  },
};
