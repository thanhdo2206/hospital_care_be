'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Feedbacks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      commentText: {
        type: Sequelize.STRING,
      },
      examinationId: {
        type: Sequelize.INTEGER,
        references: {
          model: "MedicalExaminations",
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
    await queryInterface.dropTable('Feedbacks');
  }
};