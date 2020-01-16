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

let buscarProyecto = (req, res) => {
    let tabla = 'Proyectos';
    let datos = req.body.datos;
    const buscar = db.from('Proyectos').innerJoin('Categorias','Proyectos.idCategoria','Categorias.idCategorias').select('Categorias.nombre as CatNombre', 'Proyectos.nombre as ProNombre');
    buscar.then(response => {
        return res.status(200).json({
            ok: true,
            mensaje: 'Encontrado con éxito',
            datos: response
        })
    }).catch(error => {
        message: 'Error en el servidor'
    })

}


module.exports = {
    //CRUD USERS
    createForm,
    buscarProyecto
};
