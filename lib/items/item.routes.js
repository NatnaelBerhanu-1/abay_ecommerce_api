const express = require('express');
const router = express.Router();
const controller = require('./controllers/items.controller');
const imageController = require('../images/controllers/images.controller');
const Item = require('./models/items.model');

router.get('/', async (req, res) => {
    try{
        var page = req.query.page;
        const cat = req.query.cat;
        const minPrice = req.query.minPrice;
        const filterBy = req.query.filterBy;
        const maxPrice = req.query.maxPrice;
        const condition = req.query.condition;
        const city = req.query.city;

        if (page==undefined) {
            page = 0;
        }else{
            page = parseInt(page);
        }

        const filter = {
            page: page,
            cat: cat,
            minPrice: minPrice,
            maxPrice: maxPrice,
            condition: condition,
            city: city,
            by: filterBy
        }
        // const items = offset == null ? await controller.getItems(0) :await controller.getItems(filter);
        const items = await controller.getItems(filter);
        console.log(items);
        var lastPage=0;
        if(items.count%10==0&&items.count!=0){
            lastPage = Math.floor(items.count/10) - 1;
        }else{
            lastPage = Math.floor(items.count/10);
        }
        const response = {
            data: items.rows,
            page: page,
            lastPage: lastPage
        }
        res.status(200);
        res.send(JSON.stringify(response));
    }catch(error){
        console.log(error);
        res.status(500);
        res.send();
    }
});


router.get('/search', async (req, res) => {
    try{
        const searchKey = req.query.q;
        var page = req.query.page;
        if(page==undefined){
            page = 0;
        }else{
            page = parseInt(page);
        }
        const searchResult = await controller.searchItems(searchKey, page);
        var lastPage=0;
        if(searchResult.count%10==0&&searchResult.count!=0){
            lastPage = Math.floor(searchResult.count/10) - 1;
        }else{
            lastPage = Math.floor(searchResult.count/10);
        }

        const response = {
            data: searchResult.rows,
            page: page,
            lastPage: lastPage
        }
        res.status(200);
        res.send(JSON.stringify(response));
    }catch(error){
        console.log(error);
        res.status(500);
        res.send();
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const withAssoc = req.query.assoc;
    const item = await controller.getItem(id, withAssoc);
    console.log(item);
    res.status(200);
    res.send(JSON.stringify(item));
});

router.post('/', async (req, res) => {
    try{
        const body = req.body;
        const item = await controller.createItem({ name: body.name, description: body.description, condition: body.condition, price: body.price, categoryId: body.categoryId, userId: body.userId, cityId: body.cityId })
        const images = body.images;
        images.forEach((image)=>{
            imageController.createImage({imageUrl:image, itemId:item.id})
        });
        console.log(item);
        res.status(201);
        res.setHeader("location", item.id);
        res.send("Resource created successfully");
    }catch(e){
        console.log(e);
        res.status(500);
        res.send();
    }
});

router.patch('/:id', async (req, res) => {
    console.log(req.body);
    const item = await controller.updateItem(req.params.id, req.body);
    if (item == 404) {
        res.status(404);
        res.send('Resource not found');
    } else if(item == 204) {
        console.log(item);
        res.status(204);
        res.send('Resource updated successfully');
    }
});

router.delete('/:id', async (req, res) => {
    console.log(req.params.id);
    try{
        const id = req.params.id;
        const resp = await controller.deleteItem(id);
        if(resp == 404){
            res.status(404);
            res.send('Resource not found');
        }else{
            res.status(204);
            res.send('Resource deleted successfully');
        }
        
    }catch(e){
        console.log(e);
        res.status(500);
        res.send();
    }
})

module.exports = router;