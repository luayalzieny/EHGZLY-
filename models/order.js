let customer = require('./customer');
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Order.init({
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
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};

customer.Customer.hasMany(Order, {foreignKey: 'customer_id', sourceKey: 'id'});