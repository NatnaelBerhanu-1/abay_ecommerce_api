const City = require("../model/city.model");

exports.createCity = async (city) => {
    try {
        return await City.create(city);
    } catch (error) {
        console.log(error);
        return 500;
    }
}

exports.deleteCity = async (id) => {
    try {
        const city = await City.findOne({where: {id: id}});
        if (city==null) {
            return 404;
        }else{
            await City.destroy({where: {id: id}});
            return 204;
        }
    } catch (error) {
        console.log(error);
        return 500;
    }
}

exports.updateCity = async (id, city) => {
    try{
        const city =await City.findOne({where: {id: id}});
        if (city==null) {
            return 404;
        }else {
            await City.update({name: city.name});
            return 204;
        }
    }catch(error){
        console.log(error);
        return 500;
    }
}

exports.getCities = async() => {
    try{
        return await City.findAll();
    }catch(error){
        console.log(error);
        return 500;
    }
}