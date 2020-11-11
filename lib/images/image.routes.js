const express = require('express');
const router = express.Router();
const controller = require('../images/controllers/images.controller');

router.post('/', async (req, res) => {
    var image = controller.createImage(req.body);
    if (image == 500) {
        res.status(500);
        res.send();
    }else{
        res.status(201);
        res.send("Resource created successfully");
    }
});

router.get('/', async (req, res) => {
    var images = await controller.getImages();
    res.status(200);
    res.send(images);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    var resp = await controller.deleteImage(id);
    if(resp == 404){
        res.status(404);
        res.send('Resource not found');
    }else{
        res.status(204);
        res.send();
    }
});

module.exports = router;