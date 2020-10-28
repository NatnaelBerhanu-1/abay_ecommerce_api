const {Sequelize, DataTypes} = require('sequelize');
const Item = require('../../items/models/items.model');
const sequelize = require('../../util');

const Image = sequelize.define("Image", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  imageUrl: {
    type: DataTypes.STRING
  },
  itemId: {
    type: DataTypes.UUID,
    allowNull: false
  }
});


module.exports = Image;