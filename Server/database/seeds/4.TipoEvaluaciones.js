exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('TipoEvaluaciones').del()
        .then(function () {
            // Inserts seed entries
            return knex('TipoEvaluaciones').insert([
                {tipo: 'Entregable 1'},
                {tipo: 'Entregable 2'},
                {tipo: 'Defensa 1'},
                {tipo: 'Defensa 2'},
                {tipo: 'Nota Final'}
            ]);
        });
};
