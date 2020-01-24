;
const express = require('express');
const api = express.Router(),
    crudController = require('../../app/Http/Controllers/admin_controller');

api.get('/getConfiguraciones', crudController.getConfiguraciones);
api.put('/updateConfiguraciones', crudController.updateConfiguraciones);
api.put('/updateProyecto', crudController.assignTutor);

module.exports = api;
