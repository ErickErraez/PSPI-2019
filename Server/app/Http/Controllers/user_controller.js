;
const bcrypt = require('bcrypt');
const config = require('../../../knexfile');
const jwt = require('jsonwebtoken');
const db = require('knex')(config['development']);


let registerUser = (req, res) => {
    let {nombre, apellido, email, contrasena, idRol} = req.body.params;
    db('PERSONAS').where({'email': email}).then(result => {
        console.log(result.length)
        if (result.length === 1) {
            return res.status(500).json({
                ok: false,
                message: 'Correo ya existe'
            })
        } else {
            bcrypt.hash(contrasena, 10, function (err, hash) {
                db('PERSONAS').insert({
                    nombre,
                    apellido,
                    email,
                    contrasena: hash,
                    idRol
                }).returning('idPersona')
                    .then(result => {
                        return res.status(200).json({
                            ok: true,
                            action: 'Insert',
                            id: result
                        })
                    });
            });
        }
    })

};

//AUTH ADMIN
let loginUser = (req, res) => {
    let {contrasena, email} = req.body.params;
    res.header('access-control-allow-origin', '*');
    db('PERSONAS').where({'email': email}).select('contrasena', 'nombre', 'apellido', 'idRol', 'idPersona', 'email')
        .then(result => {
            if (result.length === 1) {
                bcrypt.compare(contrasena, result[0].contrasena, (err, re) => {
                    if (re) {
                        let token;
                        if (result[0].idRol == 1) {
                            token = jwt.sign({email, contrasena}, 'userToken');
                        }
                        return res.status(200).json({
                            message: 'Login Successfull',
                            session_id: token,
                            response: {
                                'idPersona': result[0].id,
                                'nombre': result[0].nombre,
                                'apellido': result[0].apellido,
                                'idRol': result[0].idRol,
                                'email': result[0].email,
                            },

                        })
                    } else {
                        return res.status(500).json({
                            message: 'Incorrect password'
                        })
                    }
                });
            } else {
                return res.status(500).json({
                    message: 'User not found'
                })
            }
        }).catch(error => {
        console.log(error);
    });

};


module.exports = {
    //CRUD USERS
    loginUser,
    registerUser
};
