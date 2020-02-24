;
const express = require('express');
const api = express.Router(),
    crudController = require('../../app/Http/Controllers/admin_controller');

//GET METHODS
api.get('/getConfiguraciones', crudController.getConfiguraciones);
api.get('/getNotesAdmin/:tipo', crudController.getNotesAdmin);

//POST METHODS
api.post('/createCategory', crudController.createCategory);

//PUT METHODS
api.put('/updateConfiguraciones', crudController.updateConfiguraciones);
api.put('/updateProyecto', crudController.assignTutor);
api.put('/updateCategory', crudController.updateCategory);
api.put('/updateDate', crudController.updateDate);

//DELETE METHODS
api.delete('/deleteCategory/:id', crudController.deleteCategory);

module.exports = api;
