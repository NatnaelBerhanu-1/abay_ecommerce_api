const User = require('../models/user.model');

exports.createUser = async (user) => {
    try{
        return await User.create(user);
    }catch(error){
        console.log(error);
        return 500;
    }
}

exports.getUsers = async () => {
    try{
        return await User.findAll();
    }catch(error){
        console.log(error);
    }
}