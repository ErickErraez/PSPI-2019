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
api.get('/getProyectos/:nivel', proyectController.getProyectos);
api.get('/getProyectById/:id', proyectController.getProyectById);
api.get('/getTutorProyects/:id', proyectController.getTutorProyects);
api.put('/updateState', proyectController.updateState);
api.get('/getById/:id', proyectController.getById);
api.get('/getUserPendingProyect/:id', proyectController.getUserPendingProyect);
api.put('/actualizarProyecto', proyectController.actualizarProyecto);
api.post('/createWork', proyectController.createWork);
api.get('/getTutorUserProyects/:id', proyectController.getTutorUserProyects);
api.get('/getTeacherProyectWorks/:id', proyectController.getTeacherProyectWorks);
api.get('/getUserProyectWorks/:id', proyectController.getUserProyectWorks);

module.exports = api;
