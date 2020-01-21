;
const bcrypt = require('bcrypt');
const config = require('../../../knexfile');
const jwt = require('jsonwebtoken');
const db = require('knex')(config['development']);

let getConfiguraciones = (req, res) => {
    let tabla = 'Configuraciones';
    db(tabla).select().first().then(r => {
        return res.status(200).json({
            ok: true,
            datos: r,
        });
    }).catch(er => {
        return res.status(500).json({
            ok: false,
            datos: datos,
            mensaje: 'Error de Servidor' + er
        })
    });
};


module.exports = {
    //CRUD USERS
    getConfiguraciones
};
