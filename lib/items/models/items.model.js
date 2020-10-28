const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../../util');
const User = require('../../users/models/user.model');
const Category = require('../../category/models/categories.model');
const Image = require('../../images/models/images.model');


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
  }
},{});

Item.belongsTo(User, {foreignKey: 'userId'});
User.hasMany(Item, { foreignKey: 'userId'});

Item.belongsTo(Category, {foreignKey: 'categoryId'});
Item.hasMany(Image, {foreignKey: 'itemId'});

Category.hasMany(Item, {foreignKey: 'categoryId'});
Image.belongsTo(Item, {foreignKey: 'itemId'});


module.exports = Item;