const express = require('express');
const router = express.Router();
const controller = require('./controllers/categories.controller');
const Category = require('./models/categories.model');

router.get('/', async (req, res) => {
  const categories =  await controller.getCategories();
  res.status(200);
  res.send(JSON.stringify(categories));
});

router.get('/:id', async (req, res) => {
  const category = await controller.getCategory(req.params.id);
  if(category == null){
    res.status(404);
    res.send("Resource not found");
  }else{
    res.status(200);
    res.send(JSON.stringify(category));
  }
  
});

router.post('/', async (req, res) => {
  const body = req.body;
  console.log(body);
  const category = await controller.createCategory({name: body.name, imageUrl: body.imageUrl});
  res.type('application/json');
  res.status(201);
  res.setHeader("location", category.id);
  res.send("Resource created successfully");
});

router.delete('/:id', async (req, res) => {
  console.log(`id:${req.params.id}`);
  const statuscode = await controller.deleteCategory(req.params.id);
  res.status(statuscode);
  res.send();
});

router.patch('/:id', async (req, res) => {
  const category = await controller.updateCategory(req.params.id, req.body);
  if(category == null){
    res.status(404);
    res.send('Resource not found');
  }else{
    res.status(200);
    res.send('Resource updated successfully');
  }
});

module.exports = router;