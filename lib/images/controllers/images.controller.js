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

exports.deleteImage = async (id) => {
    const image = await Image.findOne({where: {id: id}});
    console.log(image);
    if (image == null){
        return 404;
    }else {
        return await Image.destroy({where: {id: id}});
    }
}