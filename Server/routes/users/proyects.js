;
const express = require('express');
const api = express.Router(),
    proyectController = require('../../app/Http/Controllers/proyect_controller');

api.post('/form', proyectController.createForm);
api.get('/getCategories', proyectController.getCategories);
api.get('/getPeriodo', proyectController.getPeriodo);

module.exports = api;
