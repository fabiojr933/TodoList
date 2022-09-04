const express = require('express');
const route = express.Router();
const UserController = require('./controller/UserController');
const LoginController = require('./controller/LoginController');
const Middleware = require('./middleware/VerifyJWT');
const TaskController = require('./controller/TaskController');

const User = new UserController();
const Login = new LoginController();
const Task = new TaskController

route.get('/user', User.index);
route.get('/user/:id', User.findById);
route.post('/user', User.store);
route.delete('/user/:id', User.delete);
route.put('/user/:id', User.update);

route.post('/login', Login.Login);

route.get('/task/alert', Task.alert);
route.post('/task', Middleware.verifyJWT, Task.store);
route.get('/task', Middleware.verifyJWT, Task.index);
route.get('/task/finished', Middleware.verifyJWT, Task.finished);
route.get('/task/:id', Middleware.verifyJWT, Task.findById);
route.delete('/task/:id', Middleware.verifyJWT, Task.delete);
route.put('/task/:id', Middleware.verifyJWT, Task.update);

module.exports = route;