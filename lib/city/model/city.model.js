const {Sequelize, DataTypes} = require('sequelize');
const Item = require('../../items/models/items.model');
const sequelize = require("../../util");


const City = sequelize.define("City", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, {});


module.exports = City;