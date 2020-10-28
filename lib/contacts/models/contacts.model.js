const {Sequelize, DataTypes} = require('sequelize');
const User = require('../../users/models/user.model');
const sequelize = require('../../util');

const Contact = sequelize.define("Contact", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING
  },
  imageUrl: {
    type: DataTypes.STRING
  }
}, {});

Contact.belongsTo(User);
User.hasMany(Contact);
module.exports = Contact;