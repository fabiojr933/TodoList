const express = require('express');
const route = express.Router();
const UserController = require('./controller/UserController');

const User = new UserController();

route.get('/user', User.index);
route.get('/user/:id', User.findById);
route.post('/user', User.store);
route.delete('/user/:id', User.delete);
route.put('/user/:id', User.update);

module.exports = route;