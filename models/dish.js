let restaurant = require('./restaurant');
let catigory = require('./catigories');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dish extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Dish.init({
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
      type: Sequelize.INTEGER(10).UNSIGNED,
      references: {
        model: 'catigories',
        key: 'id'
    }
    }
  }, {
    sequelize,
    modelName: 'Dish',
  });
  return Dish;
};


restaurant.Restaurant.hasMany(Dish, {foreignKey: 'restaurant_id', sourceKey: 'id'});
catigory.catigories.hasMany(Dish, {foreignKey: 'catigory_id', sourceKey: 'id'});