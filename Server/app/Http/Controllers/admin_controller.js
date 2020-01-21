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

let updateConfiguraciones = (req, res) => {
    let tabla = 'Configuraciones';
    let datos = req.body;
    console.log(datos)
    const qu = db(tabla).where("idConfiguraciones", datos.idConfiguraciones).update(datos);
    qu.then(resultado => {
        return res.status(200).json({
            ok: true,
            datos: resultado,
            mensaje: `Se actualizo correctamente el registro`
        })
    }).catch((error) => {
        return res.status(500).json({
            ok: false,
            datos: datos,
            mensaje: `Error del servidor: ${error}`
        })
    })
}


module.exports = {
    //CRUD USERS
    getConfiguraciones,
    updateConfiguraciones
};
