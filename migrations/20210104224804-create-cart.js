'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10).UNSIGNED
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      quantity: {
        type: Sequelize.SMALLINT(5).UNSIGNED,
        allowNull: false
      },
      notes: {
        type: Sequelize.STRING(60)
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'customers',
          key: 'id'
      }
      },
      dish_id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: 'dishes',
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
    await queryInterface.dropTable('Carts');
  }
};


