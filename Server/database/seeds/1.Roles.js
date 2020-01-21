exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('Roles').del()
        .then(function () {
            // Inserts seed entries
            return knex('Roles').insert([
                {nombre: 'Administrador'},
                {nombre: 'Estudiante'},
                {nombre: 'Tutor'},
                {nombre: 'Jurado'}
            ]);
        });
};
