"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Appointments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      doctorId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      patientId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      timeSlotId: {
        type: Sequelize.INTEGER,
        references: {
          model: "TimeSlots",
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
    await queryInterface.dropTable("Appointments");
  },
};
