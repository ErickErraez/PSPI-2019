exports.seed = function (knex, Promise) {
    return knex('Usuarios').del()
        .then(function () {
            // Inserts seed entries
            return knex('Usuarios').insert([
                {nombre1: 'MAURICIO', apellido1: 'TAMAYO', cedula: '1710623024', correo: 'ctamayo@yavirac.edu.ec', password: '123456', nivel: '', rol: 1},
                {nombre1: 'PABLO', apellido1: 'ROBAYO', cedula: '1710623025', correo: 'probayo@yavirac.edu.ec', password: '123456', nivel: '', rol: 1},
                {nombre1: 'YOGLEDIS', apellido1: 'HERRERA', cedula: '1710623026', correo: 'yherrera@yavirac.edu.ec', password: '123456', nivel: '', rol: 1},
                {nombre1:"ANTHONY",apellido1:"INTRIAGO",cedula:"1315458503",nivel:2,correo:"afc.intriago@yavirac.edu.ec",rol:2},
                {nombre1:"ANTHONY",apellido1:"LARREA",cedula:"1726624461",nivel:2,correo:"avs.larrea@yavirac.edu.ec",rol:2},
                {nombre1:"JONATHAN",apellido1:"FELIX",cedula:"1721137121",nivel:3,correo:"jhf.cordova@yavirac.edu.ec",rol:2},
                {nombre1:"KEVIN",apellido1:"PILLAJO",cedula:"1752290013",nivel:1,correo:"khm.pillajo@yavirac.edu.ec",rol:2},
                {nombre1:"JONATHAN",apellido1:"ALVEAR",cedula:"1718957887",nivel:2,correo:"jam.alvear@yavirac.edu.ec",rol:2},
                {nombre1:"ALISSON",apellido1:"CHAVEZ",cedula:"1755731542",nivel:2,correo:"ant.chavez@yavirac.edu.ec",rol:2},
                {nombre1:"KATY",apellido1:"GUAMANZARA",cedula:"1725164089",nivel:2,correo:"kvo.guamanzara@yavirac.edu.ec",rol:2},
                {nombre1:"BYRON",apellido1:"GUAYGUA",cedula:"1725174930",nivel:2,correo:"bdv.guaygua@yavirac.edu.ec",rol:2},
                {nombre1:"ERICK",apellido1:"ERRAEZ",cedula:"1725875296",nivel:5,correo:"edg.erraez@yavirac.edu.ec",rol:2},
                {nombre1:"ALEJANDRO",apellido1:"CORONEL",cedula:"1725174930",nivel:5,correo:"adf.coronel@yavirac.edu.ec",rol:2},
                {nombre1:"RODRIGO",apellido1:"DIAZ",cedula:"1725174930",nivel:5,correo:"raa.diaz@yavirac.edu.ec",rol:2},
            ]);
        });
};
