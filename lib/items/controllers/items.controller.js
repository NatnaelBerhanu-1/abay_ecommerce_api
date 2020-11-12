const { Sequelize, Op, DOUBLE } = require('sequelize');
const Category = require('../../category/models/categories.model');
const City = require('../../city/model/city.model');
const Image = require('../../images/models/images.model');
const User = require('../../users/models/user.model');
const sequelize = require('../../util');
const Item = require('../models/items.model');

exports.createItem = async (item) => {
    return await Item.create(item);
}

exports.searchItems = async (searchKey, page) => {
    return await Item.findAndCountAll({
        where: {
            [Op.or]: [
                {name: {[Op.iLike]: `%${searchKey}%`}},
                {description: {[Op.iLike]: `%${searchKey}%`}}
            ]
        },
        include: Image,
        offset: page * 10,
        limit: 10,
    });
}

exports.deleteItem = async (id) => {
    try {
        const item = await Item.findOne({ where: { id: id } });
        if (item == null) {
            return 404;
        } else {
            await Item.destroy({ where: { id: id } });
            return 204;
        }
    } catch (error) {
        console.log(error);
        return 500;
    }
}

exports.getItems = async (filter) => {
    console.log(filter);
    if (filter.by === "category") {
        return await Item.findAndCountAll(
            {
                where: {
                    categoryId: filter.cat,
                },
                include: Image,
                limit: 10,
                offset: filter.page * 10
            });
    } else if (filter.by === "all") {
        return await Item.findAndCountAll(
            {
                where: {
                    categoryId: filter.cat,
                    cityId: filter.cityId,
                    condition: filter.condition, 
                    price: {
                        [Op.gte]: filter.minPrice,
                        [Op.lte]: filter.maxPrice,
                    }
                },
                include: Image,
                limit: 10,
                offset: filter.page * 10
            });
    } else {
        return await Item.findAndCountAll(
            {
                include: Image,
                limit: 10,
                offset: filter.page * 10,
            }
        )
    }
}

exports.getItem = async (id, withAssoc) => {
    try {
        if (withAssoc == "true")
            return await Item.findOne({ where: { id: id }, include: [{ model: Category }, { model: User }, { model: City }, { model: Image }] });
        return await Item.findOne({ where: { id: id }, include: Image });
    } catch (error) {
        return null;
    }
}

exports.updateItem = async (id, item) => {
    try {
        const itm = await Item.findOne({ where: { id: id } });
        if (itm == null) {
            return 404;
        } else {
            await Item.update({ name: item.name, description: item.description, cityId: item.cityId, condition: item.condition, price: item.price, categoryId: item.categoryId, userId: item.userId }, { where: { id: id } });
            return 204;
        }
    } catch (error) {
        console.log(error);
        return 500;
    }
}