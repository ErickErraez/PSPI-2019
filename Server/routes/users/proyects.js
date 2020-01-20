;
const express = require('express');
const api = express.Router(),
    proyectController = require('../../app/Http/Controllers/proyect_controller');

api.post('/form', proyectController.createForm);
api.get('/getCategories', proyectController.getCategories);
api.get('/getDocentes', proyectController.getProfesor);
api.get('/getPeriodo', proyectController.getPeriodo);
api.post('/createUserProyect', proyectController.createUserProyect);
api.get('/getUsersProyects/:id', proyectController.getUsersProyects);
api.get('/getUserProyect/:id', proyectController.getUserProyect);

module.exports = api;
