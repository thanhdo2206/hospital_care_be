"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("CategoryMedicalExaminations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          key: "id",
        },
      },
      examinationId: {
        type: Sequelize.INTEGER,
        references: {
          model: "MedicalExaminations",
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
    await queryInterface.dropTable("CategoryMedicalExaminations");
  },
};
