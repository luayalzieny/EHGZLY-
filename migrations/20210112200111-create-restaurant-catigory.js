'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('restaurant_catigories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      restaurant_id: {
        allowNull: false,
        type: Sequelize.INTEGER(10).UNSIGNED,
        references: {
          model: 'restaurants',
          key: 'id'
      }
      },
      catigory_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'catigories',
          key: 'id'
      }
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
    await queryInterface.dropTable('restaurant_catigories');
  }
};