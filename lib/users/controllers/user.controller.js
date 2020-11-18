const User = require('../models/user.model');

exports.createUser = async (body) => {
    var user = await User.findOne({where: {phoneNumber: body.phoneNumber}});
    if(user != null){
        return user;
    }else{
        return await User.create(body);
    }
}

exports.getUsers = async () => {
    try{
        return await User.findAll();
    }catch(error){
        console.log(error);
    }
}

exports.getUser = async (value, by) => {
    if(by==undefined){
        return User.findOne({where: {id: value}});
    }else if(by=="phoneNum"){
        return User.findOne({where: {phoneNumber: value}});
    }else{
        return null;
    }
}

exports.updateUser = async (body, id)=>{
    try{
    const user = await User.findOne({where: {id: id}});
    console.log(user);
    if(user != null){
        await user.update({firstName: body.firstName, lastName: body.lastName, profilePicture: body.profilePicture});
        return user;
    }else{
        return null;
    }
    }catch(error){
        return null;
    }
}