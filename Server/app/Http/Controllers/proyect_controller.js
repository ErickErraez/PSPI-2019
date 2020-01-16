;
const bcrypt = require('bcrypt');
const config = require('../../../knexfile');
const jwt = require('jsonwebtoken');
const db = require('knex')(config['development']);

let createForm = (req, res) => {
    let tabla = 'Proyectos';
    let datos = req.body;
    const qu = db.insert(datos).into(tabla);
    qu.then(resultado => {
        idProyectos = resultado[0];
        const proyect = db(tabla).where('idProyectos', idProyectos).select('idProyectos', 'nombre', 'descripcion', 'herramientas', 'estado', 'idCategoria', 'idPeriodo').first();
        proyect.then(r => {
            let objeto;
            objeto = r;
            const ca = db('Categorias').where('idCategorias', objeto.idCategoria).select().first();
            ca.then(resp => {
                objeto.categoria = resp;
                const pa = db('Categorias').where('idCategorias', objeto.idCategoria).select().first();
                pa.then(periodoA => {
                    objeto.periodo = periodoA;
                    return res.status(200).json({
                        ok: true,
                        proyecto: objeto,
                        mensaje: `Registro Creado con Exito`
                    })
                }).catch(periodoE => {
                    return res.status(500).json({
                        ok: false,
                        datos: datos,
                        mensaje: `Error del servidor: ${error}` + tabla
                    })
                });

            }).catch(er => {
                return res.status(500).json({
                    ok: false,
                    datos: datos,
                    mensaje: `Error del servidor: ${error}` + tabla
                })
            });


        }).catch(er => {
            return res.status(500).json({
                ok: false,
                datos: datos,
                mensaje: `Error del servidor: ${error}` + tabla
            })
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

let getCategories = (req, res) => {
    let tabla = 'Categorias';
    db(tabla).select()
        .then(resultado => {
            return res.status(200).json({
                ok: true,
                datos: resultado,
            })
        })
        .catch((error) => {
            return res.status(500).json({
                ok: false,
                datos: null,
                mensaje: `Error del servidor: ${error}`
            })
        })
};


let getPeriodo = (req, res) => {
    let tabla = 'PeriodoAcademico';
    db(tabla).orderBy('created_at', 'desc').select().first()
        .then(resultado => {
            return res.status(200).json({
                ok: true,
                datos: resultado,
            })
        })
        .catch((error) => {
            return res.status(500).json({
                ok: false,
                datos: null,
                mensaje: `Error del servidor: ${error}`
            })
        })
};

module.exports = {
    //CRUD USERS
    createForm,
    getCategories,
    getPeriodo
};
