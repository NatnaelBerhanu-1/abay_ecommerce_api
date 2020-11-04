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

module.exports = router;