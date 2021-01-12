'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Ratings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10).UNSIGNED
      },
      order_packaging: {
        type: Sequelize.INTEGER(10).UNSIGNED
      },
      value_of_money: {
        type: Sequelize.INTEGER(10).UNSIGNED
      },
      preparing_time: {
        type: Sequelize.INTEGER(10).UNSIGNED
      },
      quality_of_food: {
        type: Sequelize.INTEGER(10).UNSIGNED
      },
      comments: {
        type: Sequelize.STRING(80)
      },
      customer_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'customers',
          key: 'id'
      }
      },
      restaurant_id: {
        allowNull: false,
        type: Sequelize.INTEGER(10).UNSIGNED,
        references: {
          model: 'restaurants',
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
    await queryInterface.dropTable('Ratings');
  }
};