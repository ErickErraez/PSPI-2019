;
const express = require('express');
const bodyParser = require('body-parser');

const app = express(),
    user_routes = require('./users');
    mail = require('./mail');
app.use('/users', user_routes);
app.use('/mail', mail);
module.exports = app;

