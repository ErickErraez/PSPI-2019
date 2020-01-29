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


let assignTutor = (req, res) => {
    let tabla = 'Proyectos';
    let datos = req.body;
    const qu = db(tabla).where("idProyectos", datos.idProyectos).andWhere('PeriodoAcademico.estado', 'Activo')
        .innerJoin('PeriodoAcademico', 'Proyectos.idPeriodo', 'PeriodoAcademico.idPeriodoAcademico')
        .update(datos);
    qu.then(resultado => {
        return res.status(200).json({
            ok: true,
            datos: resultado,
            mensaje: `Se actualizo correctamente el registro`
        })
    })
        .catch((error) => {
            return res.status(500).json({
                ok: false,
                datos: datos,
                mensaje: `Error del servidor: ${error}`
            })
        })
}

let updateConfiguraciones = (req, res) => {
    let tabla = 'Configuraciones';
    let datos = req.body;
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
};

let createCategory = (req, res) => {
    let tabla = 'Categorias';
    let datos = req.body;
    const qu = db(tabla).insert(datos);
    qu.then(resultado => {
        return res.status(200).json({
            ok: true,
            datos: resultado,
            mensaje: `Se creo correctamente el registro`
        })
    }).catch((error) => {
        return res.status(500).json({
            ok: false,
            mensaje: `Error del servidor: ${error}`
        })
    })
};

let updateCategory = (req, res) => {
    let tabla = 'Categorias';
    let datos = req.body;
    const qu = db(tabla).where("idCategorias", datos.idCategorias).update(datos);
    qu.then(resultado => {
        return res.status(200).json({
            ok: true,
            datos: resultado,
            mensaje: `Se creo correctamente el registro`
        })
    }).catch((error) => {
        return res.status(500).json({
            ok: false,
            mensaje: `Error del servidor: ${error}`
        })
    })
};

let deleteCategory = (req, res) => {
    let tabla = 'Categorias';
    let datos = req.params.id;
    const qu = db(tabla).where("idCategorias", datos).delete();
    qu.then(resultado => {
        return res.status(200).json({
            ok: true,
            datos: resultado,
            mensaje: `Se Borro con exito`
        })
    })
        .catch((error) => {
            return res.status(500).json({
                ok: false,
                mensaje: `Error del servidor: ${error}`
            })
        })
}


module.exports = {
    //CRUD USERS
    getConfiguraciones,
    updateConfiguraciones,
    assignTutor,
    createCategory,
    updateCategory,
    deleteCategory
};
