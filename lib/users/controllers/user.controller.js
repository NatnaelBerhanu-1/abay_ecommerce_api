const User = require('../models/user.model');

exports.createUser = async (user) => {
    return await User.create(user);
}

exports.getUsers = async () => {
    try{
        return await User.findAll();
    }catch(error){
        console.log(error);
    }
}