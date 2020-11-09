const express = require('express');
const router = express.Router();
const categoryController = require('./category/controllers/categories.controller');


router.get('/', async (req, res) => {
    try{
        const categories = await categoryController.getCategories();
        const featuredAds = {};
        const resp = {
            categories: categories,
            featuredAds: featuredAds
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