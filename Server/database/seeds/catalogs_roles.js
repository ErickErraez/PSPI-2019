exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('catalogs.roles').del()
        .then(function () {
            // Inserts seed entries
            return knex('catalogs.roles').insert([
                {id: 1, name: 'Cliente'},
                {id: 2, name: 'Employee'},
                {id: 3, name: 'Proveedor'}
            ]);
        });
};
