 let customer = require('./customer');
 let dish = require('./dish');
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Cart.init({
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
      allowNull: false
    },
    dish_id: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};


customer.Customer.hasMany(Cart, {foreignKey: 'customer_id', sourceKey: 'id'});
dish.Dish.hasMany(Cart, {foreignKey: 'dish_id', sourceKey: 'id'});