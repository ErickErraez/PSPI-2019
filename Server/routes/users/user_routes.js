;
const express = require('express');
const api = express.Router(),
    crudController = require('../../app/Http/Controllers/user_controller');

api.post('/register', crudController.registerUser);
api.post('/login', crudController.loginUser);
api.post('/form', crudController.createForm),

    module.exports = api;
