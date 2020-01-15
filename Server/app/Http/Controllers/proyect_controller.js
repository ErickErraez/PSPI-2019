;
const bcrypt = require('bcrypt');
const config = require('../../../knexfile');
const jwt = require('jsonwebtoken');
const db = require('knex')(config['development']);

let createForm = (req, res) => {
    let tabla = 'Proyectos';
    let datos = req.body.datos;
    const qu = db.insert(datos[i]).into(tabla);
    qu.then(resultado => {
        console.log(resultado);
        return res.status(200).json({
            ok: true,
            datos: resultado,
            mensaje: `Registro Creado con Exito`
        })
    })
        .catch((error) => {
            return res.status(500).json({
                ok: false,
                datos: datos,
                mensaje: `Error del servidor: ${error}` + tabla
            })
        })
};

module.exports = {
    //CRUD USERS
    createForm
};
