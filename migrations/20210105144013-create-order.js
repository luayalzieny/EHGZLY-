'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10).UNSIGNED
      },
      customer_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'customers',
          key: 'id'
      }
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      created: {
        allowNull: false,
        type: Sequelize.DATE
      },
      totalPrice: {
        allowNull: false,
        type: Sequelize.DECIMAL(6,2)
      },
      copun: {
        type: Sequelize.STRING(30)
      },
      charge_id: {
        type: Sequelize.INTEGER(10)
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
    await queryInterface.dropTable('Orders');
  }
};