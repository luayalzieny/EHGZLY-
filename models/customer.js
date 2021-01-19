'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Customer.init({
    id:{
      type:Sequelize.INTEGER,
      allowNull:false,
      autoIncrement:true,
      primaryKey:true
    },
    firstName: {
      type: Sequelize.STRING(30),
      allowNull:false
  },
    lastName: {
      type: Sequelize.STRING(30),
      allowNull:false
  },
    email: {
      type: Sequelize.STRING(70),
      unique:true,
      allowNull:false
  },
    phone: {
      type: Sequelize.STRING(11),
      allowNull:false
  },
    password: {
      type: Sequelize.CHAR(60),
      allowNull:false
  }
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};