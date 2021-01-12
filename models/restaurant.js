'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Restaurant.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER(10).UNSIGED
    },
    firstName: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING(11),
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(70),
      allowNull: false,
      unique:true
    },
    restaurat_name: {
      type: Sequelize.STRING(60),
      allowNull: false
    },
    restaurant_cuisine: {
      type: Sequelize.STRING(50),
      allowNull: false,
      defaultValue:Fast_Food
    },
    locations: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    open_hours: {
      type: Sequelize.TIME,
      allowNull: false
    },
    img: {
      type: Sequelize.STRING(30)
    }
  }, {
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};