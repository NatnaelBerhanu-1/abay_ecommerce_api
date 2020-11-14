const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../../util');
const User = require('../../users/models/user.model');
const Category = require('../../category/models/categories.model');
const Image = require('../../images/models/images.model');
const City = require('../../city/model/city.model');

const Item = sequelize.define("Item", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  condition: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  categoryId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  cityId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
},{});

Item.belongsTo(User, {foreignKey: 'userId'});
User.hasMany(Item, { foreignKey: 'userId'});

Item.belongsTo(Category, {foreignKey: 'categoryId'});
Item.hasMany(Image, {foreignKey: 'itemId'});

Category.hasMany(Item, {foreignKey: 'categoryId'});
Image.belongsTo(Item, {foreignKey: 'itemId'});

Item.belongsTo(City, {foreignKey: 'cityId'});
City.hasMany(Item, {foreignKey: 'cityId'});


module.exports = Item;