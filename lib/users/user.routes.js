const router = require('express').Router();
const controller = require('./controllers/user.controller');

router.get('/', async (req, res, next) => {
  const users = await controller.getUsers();
  res.status(200);
  console.log(users);
  res.send(JSON.stringify(users));
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