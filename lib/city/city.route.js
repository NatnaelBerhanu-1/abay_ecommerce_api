const express = require('express');
const router = express.Router();
const controller = require('./controller/city.controller');
const City = require('./model/city.model');

router.get('/', async (req, res) => {
    const items = await controller.getCities();
    res.status(200);
    res.send(JSON.stringify(items));
});

router.post('/', async (req, res) => {
    const body = req.body;
    const city = await controller.createCity({name: body.name});
    res.status(201);
    res.setHeader('location', city.id);
    res.send("Resource created Successfully");
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const resp = await controller.deleteCity(id);
    if (resp == 404) {
        res.status(404);
        res.send('Resource not found');
    } else {
        res.status(204);
        res.send('Resource deleted successfully');
    }
});

router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const resp = await controller.updateCity(id, body);
    if (resp == 404) {
        res.status(404);
        res.send("Resource not found");
    }else if(resp == 204){
        res.status(204);
        res.send("Resource updated successfully");
    }
})

module.exports = router;