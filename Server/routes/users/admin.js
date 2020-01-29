;
const express = require('express');
const api = express.Router(),
    crudController = require('../../app/Http/Controllers/admin_controller');

api.get('/getConfiguraciones', crudController.getConfiguraciones);
api.put('/updateConfiguraciones', crudController.updateConfiguraciones);
api.put('/updateProyecto', crudController.assignTutor);
api.post('/createCategory', crudController.createCategory);
api.put('/updateCategory', crudController.updateCategory);
api.delete('/deleteCategory/:id', crudController.deleteCategory);

module.exports = api;
