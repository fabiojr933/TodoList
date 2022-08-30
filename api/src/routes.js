const express = require('express');
const route = express.Router();
const UserController = require('./controller/UserController');
const LoginController = require('./controller/LoginController');

const User = new UserController();
const Login = new LoginController();

route.get('/user', User.index);
route.get('/user/:id', User.findById);
route.post('/user', User.store);
route.delete('/user/:id', User.delete);
route.put('/user/:id', User.update);

route.post('/login', Login.Login);

module.exports = route;