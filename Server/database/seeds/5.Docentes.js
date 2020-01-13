exports.seed = function (knex, Promise) {
    return knex('Usuarios').del()
        .then(function () {
            // Inserts seed entries
            return knex('Usuarios').insert([
                {nombre: 'Mauricio', apellido: 'Tamayo', cedula: '1710623024', correo: 'ctamayo@yavirac.edu.ec', password: '123456', nivel: '', idRol: 1},
                {nombre: 'Pablo', apellido: 'Robayo', cedula: '1710623025', correo: 'probayo@yavirac.edu.ec', password: '123456', nivel: '', idRol: 1},
                {nombre: 'Yogledis', apellido: 'Herrera', cedula: '1710623026', correo: 'yherrera@yavirac.edu.ec', password: '123456', nivel: '', idRol: 1},
            ]);
        });
};
