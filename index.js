const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// models
const User = require('./lib/users/models/user.model.js');
const Category = require('./lib/category/models/categories.model');
const Item = require('./lib/items/models/items.model');
const Image = require('./lib/images/models/images.model.js');
const Contact = require('./lib/contacts/models/contacts.model.js');
// create tables if not exist
Image.sync();
Category.sync();
Contact.sync();
User.sync();
Item.sync();

// routers
const userRouter = require('./lib/users/user.routes');
const categoryRouter = require('./lib/category/category.routes');
const itemRouter = require('./lib/items/item.routes');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/api/v1/', (req, res) => {
  res.send("welcome");
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/items', itemRouter);

app.listen(port, ()=> {
  console.log(`Server started on 127.0.0.1:${port}`);
});
