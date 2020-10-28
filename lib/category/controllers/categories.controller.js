const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../../util');
const Category = require('../models/categories.model');

exports.createCategory = async (category) => {
  try{
    return await Category.create(category);
  }catch(error){
    console.log(error);
    return 500;
  }
}

exports.deleteCategory = async (id) => {
  try{
    const cat = await Category.findOne({where: {id: id}});
    if(cat == null){
      return 404;
    }else{
      Category.destroy({where: {id: id}});
      return 204;
    }
  }catch(error){
    return 500;
  }
}

exports.getCategories = async ()  => {
  console.log(typeof(Category));
  return await Category.findAll();
}
 
exports.getCategory = async (id) => {
  try{
    return await Category.findOne({where: {id: id}});
  }catch(error){
    return null;
  }
}

exports.updateCategory = async (id, category) => {
  try{
    const cat = await Category.findOne({where: {id: id}});
    if(cat == null){
      return null;
    }else{
      await Category.update({name: category.name, imageUrl: category.imageUrl}, {where:{id:id}});
      return cat;
    }
  }catch(error){
    return null;
  }
}
