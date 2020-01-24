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
    const proyecto = db(tabla).orderBy('Proyectos.created_at', 'desc').where('idEstudiante', datos).whereNot('Proyectos.estado', 'Pendiente')
        .innerJoin('Proyectos', 'UsuariosProyectos.idProyecto', 'Proyectos.idProyectos')
        .innerJoin('Usuarios as Tutor', 'Proyectos.Tutor', 'Tutor.idUsuarios')
        .innerJoin('Usuarios as Jurado1', 'Proyectos.jurado1', 'Jurado1.idUsuarios')
        .innerJoin('Usuarios as Jurado2', 'Proyectos.jurado2', 'Jurado2.idUsuarios')
        .innerJoin('Categorias', 'Proyectos.idCategoria', 'Categorias.idCategorias')
        .innerJoin('PeriodoAcademico', 'Proyectos.idPeriodo', 'PeriodoAcademico.idPeriodoAcademico')
        .select('UsuariosProyectos.idUsuariosProyectos', 'UsuariosProyectos.idEstudiante', 'UsuariosProyectos.idProyecto',
            'Proyectos.nombre as nombreProyecto', 'Proyectos.descripcion as descripcionProyecto', 'Proyectos.estado as estadoProyecto',
            'Proyectos.herramientas as herramientasProyecto', 'Proyectos.nivel as nivelProyecto', db.raw(`CONCAT(Tutor.nombre1, ' ', Tutor.apellido1) as "tutor"`),
            db.raw(`CONCAT(Jurado1.nombre1, ' ', Jurado1.apellido1) as "jurado1"`), db.raw(`CONCAT(Jurado2.nombre1, ' ', Jurado2.apellido1) as "jurado2"`), 'Categorias.nombre as categoria',
            'PeriodoAcademico.nombre as periodo', 'PeriodoAcademico.estado as estadoPeriodo');
    proyecto.then(response => {
        return res.status(200).json({
            ok: true,
            mensaje: 'Encontrado con Exito',
            datos: response
        })
    }).catch(err => {
        return res.status(500).json({
            ok: false,
            mensaje: `Error del servidor: ${err}`
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
                        mensaje: `Error del servidor: ${periodoE}`
                    })
                });

            }).catch(er => {
                return res.status(500).json({
                    ok: false,
                    datos: datos,
                    mensaje: `Error del servidor: ${er}`
                })
            });


        }).catch(err => {
            return res.status(500).json({
                ok: false,
                datos: datos,
                mensaje: `Error del servidor: ${err}`
            })
        });

    }).catch((error) => {
        return res.status(500).json({
            ok: false,
            datos: datos,
            mensaje: `Error del servidor: ${error}`
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
    const profesor = db(tabla).innerJoin('Roles', 'Usuarios.rol', 'Roles.idRoles')
        .select('idUsuarios', 'Usuarios.nombre1', 'apellido1', 'correo', 'rol', 'Roles.nombre as rol_descripcion')
        .whereNot('rol', 2);
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

let getProyectos = (req, res) => {
    let tabla = 'Proyectos';
    let nivel = req.params.nivel;
    const qu = db(tabla)
        .innerJoin('PeriodoAcademico', 'Proyectos.idPeriodo', 'PeriodoAcademico.idPeriodoAcademico')
        .where('nivel', nivel).andWhere('PeriodoAcademico.estado', 'Activo')
        .select('Proyectos.idProyectos', 'Proyectos.nombre', 'Proyectos.descripcion', 'Proyectos.herramientas',
            'Proyectos.estado', 'Proyectos.nivel', 'Proyectos.tutor', 'Proyectos.jurado1',
            'Proyectos.jurado2', 'PeriodoAcademico.nombre as nombrePeriodo');
    qu.then(r => {
        return res.status(200).json({
            ok: true,
            datos: r,
        });
    }).catch(er => {
        return res.status(500).json({
            ok: false,
            datos: er,
            mensaje: 'Error de Servidor' + er
        })
    });
}

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
    getProyectos,
    saveNotes
};
