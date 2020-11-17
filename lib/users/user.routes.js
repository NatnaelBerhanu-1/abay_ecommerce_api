const router = require('express').Router();
const { response } = require('express');
const controller = require('./controllers/user.controller');
const User = require('./models/user.model');

router.get('/', async (req, res, next) => {
  const users = await controller.getUsers();
  res.status(200);
  console.log(users);
  res.send(JSON.stringify(users));
});

router.get('/:value', async (req, res) => {
  try{
    var by = req.query.by;
    var value = req.params.value;
    console.log(by);
    var user = await controller.getUser(value, by);
    console.log(user);
    if(user == null){
      res.status(404);
      res.send("Resource not found");
    }else{
      res.status(200);
      res.send(JSON.stringify(user));
    }
  }catch(error){
    console.log(error);
    res.status(500);
    res.send();
  }
});

router.post('/', async (req, res) => {
  try{
    const body = req.body;
    console.log(body);
    const user = await controller.createUser({ firstName: body.firstName, lastName: body.lastName, phoneNumber: body.phoneNumber });
    console.log(user);
    res.type('application/json');
    res.status(201);
    res.setHeader("location", user.id);
    res.send(JSON.stringify(user));
  }catch(error){
    res.status(500);
    res.send();
  }
});

module.exports = router;