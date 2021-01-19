let customer = require('./customer');
let restaurant = require('./restaurant');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Rating.init({
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
      type: Sequelize.INTEGER
    },
    restaurant_id: {
      allowNull: false,
      type: Sequelize.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};

customer.Customer.hasMany(Rating, {foreignKey: 'customer_id', sourceKey: 'id'});
restaurant.Restaurant.hasMany(Rating, {foreignKey: 'restaurant_id', sourceKey: 'id'});