const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../../util');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
  profilePicture: {
    type: DataTypes.STRING,
    defaultValue: null
  }
});


module.exports = User;