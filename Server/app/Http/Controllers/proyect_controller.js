;
const bcrypt = require('bcrypt');
const config = require('../../../knexfile');
const jwt = require('jsonwebtoken');
const db = require('knex')(config['development']);
const Proyecto = require('../../Models/Proyectos').Proyecto;
const UserProyects = require('../../Models/UsuariosProyectos').UsuariosProyectos;


let getUserProyect = (req, res) => {
    let tabla = 'UsuariosProyectos';
    let datos = req.params.id;
    const proyecto = db(tabla).where('idEstudiante', datos).innerJoin('Proyectos', 'UsuariosProyectos.idProyecto', 'Proyectos.idProyectos').select().first();
    proyecto.then(response => {
        return res.status(200).json({
            ok: true,
            mensaje: 'Encontrado con Exito',
            datos: response
        })
    }).catch(err => {
        return res.status(500).json({
            message: 'Error en el Servidor'
        })
    });

};

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


let getProfesor = (req, res) => {
    let tabla = 'Usuarios';
    let datos = req.body;
    const profesor = db(tabla).innerJoin('Roles', 'Usuarios.idRol', 'Roles.idRoles')
        .select('idUsuarios', 'Usuarios.nombre', 'apellido', 'correo', 'idRol', 'Roles.nombre as rol_descripcion')
        .whereNot('idRol', 4);
    profesor.then(r => {
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

let createUserProyect = (req, res) => {
    let tabla = 'UsuariosProyectos';
    let datos = req.body;
    const qu = db.insert(datos).into(tabla);
    qu.then(r => {
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

let getUsersProyects = (req, res) => {
    let id = req.params.id;
    UserProyects.query({
        where: {idProyecto: id}
    })
        .fetch({withRelated: ['estudiante.rol', 'proyecto.tutor', 'proyecto.jurado1.rol', 'proyecto.jurado2', 'proyecto.periodoAcademico', 'proyecto.categoria']})
        .then(response => {
            console.log(response);
            return res.status(200).json({
                ok: true,
                mensaje: 'ENCONTRADO CON EXITO',
                datos: response
            })
        }).catch(err => {
        return res.status(500).json({
            ok: false,
            mensaje: `Error del servidor: ${err}`
        })
    });
};

let saveNotes = (req, res) => {
    let tabla = 'Notas';
    let datos = req.body;
    const qu = db.insert(datos).into(tabla);
    qu.then(r => {
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
    createForm,
    getCategories,
    getPeriodo,
    getProfesor,
    createUserProyect,
    getUsersProyects,
    getUserProyect,
    saveNotes
};
