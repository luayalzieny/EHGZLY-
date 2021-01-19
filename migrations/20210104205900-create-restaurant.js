'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Restaurants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10).UNSIGNED
      },
      firstName: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING(11),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(70),
        allowNull: false,
        unique:true
      },
      restaurat_name: {
        type: Sequelize.STRING(60),
        allowNull: false
      },
      restaurant_cuisine: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue:'Fast_Food'
      },
      locations: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      open_hours: {
        type: Sequelize.TIME,
        allowNull: false
      },
      img: {
        type: Sequelize.STRING(30) 
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
    await queryInterface.dropTable('Restaurants');
  }
};