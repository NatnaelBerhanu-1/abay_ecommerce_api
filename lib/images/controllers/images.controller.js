const Image = require("../models/images.model");

exports.createImage = async (image) => {
    try{
        return await Image.create(image);
    }catch(error){
        console.log(error);
        return 500;
    }
}

exports.getImages = async () => {
    return await Image.findAll();
}