;
const express = require('express');
const api = express.Router(),
    sendMail = require('../../app/Http/Mailer/index'),
    middlewares = require('../../app/Http/Middelware/jwt_middleware');

api.post('/enviar', middlewares.ensureTokenAdmin, sendMail.sendMail);

module.exports = api;
