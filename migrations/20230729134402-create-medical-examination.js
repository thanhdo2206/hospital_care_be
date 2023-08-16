"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MedicalExaminations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      examinationPrice: {
        type: Sequelize.BIGINT,
      },
      title: {
        type: Sequelize.STRING,
      },
      shortDescription: {
        type: Sequelize.TEXT,
      },
      description: {
        type: Sequelize.TEXT,
      },
      image: {
        type: Sequelize.STRING,
      },
      doctorId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      departmentId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Departments",
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
    await queryInterface.dropTable("MedicalExaminations");
  },
};
