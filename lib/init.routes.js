const express = require('express');
const router = express.Router();
const categoryController = require('./category/controllers/categories.controller');
const cityController = require('./city/controller/city.controller');


router.get('/', async (req, res) => {
    try{
        const categories = await categoryController.getCategories();
        const cities = await cityController.getCities();
        const featuredAds = [];
        const resp = {
            categories: categories,
            featuredAds: featuredAds,
            cities: cities,
        };
        res.status(200);
        res.send(JSON.stringify(resp));
    }catch(error){
        console.log(error);
        res.status(500);
        res.send();
    }    
});

module.exports = router;