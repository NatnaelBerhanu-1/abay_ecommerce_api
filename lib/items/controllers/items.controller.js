const {Sequelize} = require('sequelize');
const Category = require('../../category/models/categories.model');
const City = require('../../city/model/city.model');
const Image = require('../../images/models/images.model');
const User = require('../../users/models/user.model');
const Item = require('../models/items.model');

exports.createItem = async (item) => {
    try {
        return await Item.create(item);
    } catch (error) {
        console.log(error);
        return 500;
    }
}

exports.deleteItem = async (id) => {
    try{
        const item = await Item.findOne({where: {id: id}});
        if (item == null) {
            return 404;
        }else{
            await Item.destroy({where: {id: id}});
            return 204;
        }
    }catch(error){
        console.log(error);
        return 500;
    }
}

exports.getItems = async (offset) => {
    try{
        return await Item.findAndCountAll({include: Image, offset: offset});
    }catch(error){
        console.log(error);
    }
}

exports.getItem = async (id, withAssoc) => {
    try{
        if(withAssoc=="true")
        return await Item.findOne({where: {id: id}, include: [{model: Category}, {model: User}, {model: City}, {model: Image}]});
        return await Item.findOne({where:{id: id}, include: Image});
    }catch(error){
        return null;
    }
}

exports.updateItem = async (id, item) => {
    try{
        const itm = await Item.findOne({where: {id: id}});
        if (itm == null) {
            return 404;
        }else{
            await Item.update({name: item.name, description: item.description, cityId: item.cityId, condition: item.condition, price: item.price, categoryId: item.categoryId, userId: item.userId}, {where: {id: id}});
            return 204;
        } 
    }catch(error){
        console.log(error);
        return 500;
    }
}