let restaurant = require('./restaurant');
let catigory = require('./catigories');
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class restaurant_catigory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  restaurant_catigory.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER(10).UNSIGND
    },
    restaurant_id: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      references: {
        model: 'restaurants',
        key: 'id'
    }
    },
    catigory_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'catigories',
        key: 'id'
    }
    }
  }, {
    sequelize,
    modelName: 'restaurant_catigory',
  });
  return restaurant_catigory;
};


restaurant.Restaurant.hasMany(restaurant_catigory, {foreignKey: 'restaurant_id', sourceKey: 'id'});
catigory.catigories.hasMany(restaurant_catigory, {foreignKey: 'catigory_id', sourceKey: 'id'});