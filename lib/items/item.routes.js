const express = require('express');
const router = express.Router();
const controller = require('./controllers/items.controller');
const Item = require('./models/items.model');

router.get('/', async (req, res) => {
    const offset = req.query.page;
    console.log(offset);
    const items = offset == null ? await controller.getItems(0) :await controller.getItems(offset);
    console.log(items);
    res.status(200);
    res.send(JSON.stringify(items));
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