const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../../util');

const Category = sequelize.define("Category",{
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING
  },
  imageUrl: {
    type: DataTypes.TEXT
  }
},{});


module.exports = Category;
 