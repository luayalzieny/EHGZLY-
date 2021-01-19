'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Dishes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10).UNSIGNED
      },
      dishName: {
        allowNull: false,
        type: Sequelize.STRING(40)
      },
      choice_of_size: {
        allowNull: false,
        type: Sequelize.ENUM('large','meduim','small')
      },
      description: {
        type: Sequelize.STRING(70)
      },
      img: {
        type: Sequelize.STRING(30)
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(6,2)
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
    await queryInterface.dropTable('Dishes');
  }
};