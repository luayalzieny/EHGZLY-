'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING(30),
        allowNull:false
      },
      lastName: {
        type: Sequelize.STRING(30),
        allowNull:false
      },
      email: {
        type: Sequelize.STRING(70),
        unique:true,
        allowNull:false
      },
      phone: {
        type: Sequelize.STRING(11),
        allowNull:false
      },
      password: {
        type: Sequelize.CHAR(60),
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Customers');
  }
};