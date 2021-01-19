'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class catigories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  catigories.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    catigory_name: {
      allowNull: false,
      type: Sequelize.STRING(30)
    },
    img: {
      type: Sequelize.STRING(30)
    },
    description: {
      type: Sequelize.STRING(70)
    }
  }, {
    sequelize,
    modelName: 'catigories',
  });
  return catigories;
};