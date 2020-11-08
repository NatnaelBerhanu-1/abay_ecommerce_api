const express = require('express');
const router = express.Router();
const controller = require('./controllers/items.controller');
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
        res.status(200);
        res.send(JSON.stringify(items));
    }catch(error){
        console.log(error);
        res.status(500);
        res.send();
    }
});


router.get('/search', async (req, res) => {
    try{
        const searchKey = req.query.q;
        const page = req.query.page;
        const searchResult = await controller.searchItems(searchKey, page);
        res.status(200);
        res.send(JSON.stringify(searchResult));
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
    const body = req.body;
    const item = await controller.createItem({ name: body.name, description: body.description, condition: body.condition, price: body.price, categoryId: body.categoryId, userId: body.userId, cityId: body.cityId })
    console.log(item);
    if (item != 500){
        res.type('application/json');
        res.status(201);
        res.setHeader("location", item.id);
        res.send("Resource created successfully");
    }
    res.status(500);
    res.send();
    
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

module.exports = router;