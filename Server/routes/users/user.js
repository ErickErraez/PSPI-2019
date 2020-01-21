;
const express = require('express');
const api = express.Router(),
    crudController = require('../../app/Http/Controllers/user_controller');

api.post('/register', crudController.registerUser);
api.post('/login', crudController.loginUser);
api.get('/getUserByEmail/:email', crudController.getUserByEmail);
api.post('/createUser', crudController.createUser);
api.post('/insertAllUsers', crudController.insertUsers);

module.exports = api;
