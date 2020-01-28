exports.seed = function (knex, Promise) {
    return knex('Usuarios').del()
        .then(function () {
            // Inserts seed entries
            return knex('Usuarios').insert([
                {nombre1: 'MAURICIO', apellido1: 'TAMAYO', cedula: '1710623024', correo: 'ctamayo@yavirac.edu.ec', password: '123456', nivel: '', rol: 1},
                {nombre1: 'PABLO', apellido1: 'ROBAYO', cedula: '1710623025', correo: 'probayo@yavirac.edu.ec', password: '123456', nivel: '', rol: 1},
                {nombre1: 'YOGLEDIS', apellido1: 'HERRERA', cedula: '1710623026', correo: 'yherrera@yavirac.edu.ec', password: '123456', nivel: '', rol: 1},
                ]);
        });
};
