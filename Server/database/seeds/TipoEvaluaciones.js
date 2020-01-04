exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('TipoEvaluaciones').del()
        .then(function () {
            // Inserts seed entries
            return knex('TipoEvaluaciones').insert([
                {nombre: 'Entregable 1'},
                {nombre: 'Entregable 2'},
                {nombre: 'Defensa 1'},
                {nombre: 'Defensa 2'},
                {nombre: 'Nota Final'}
            ]);
        });
};
