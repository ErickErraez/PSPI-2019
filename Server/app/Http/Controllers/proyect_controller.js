;
const bcrypt = require('bcrypt');
const config = require('../../../knexfile');
const jwt = require('jsonwebtoken');
const db = require('knex')(config['development']);

let createForm = (req, res) => {
    let tabla = 'Proyectos';
    let datos = req.body;
    console.log(datos);
    const qu = db.insert(datos).into(tabla);
    qu.then(resultado => {
        idProyectos = resultado[0];
        const proyect = db(tabla).where('idProyectos', idProyectos).select('idProyectos', 'nombre', 'descripcion', 'herramientas', 'estado').first();
        proyect.then(r => {
            return res.status(200).json({
                ok: true,
                proyecto: r,
                mensaje: `Registro Creado con Exito`
            })
        }).catch(er => {

        });

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
