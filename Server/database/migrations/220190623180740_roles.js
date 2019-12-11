exports.up = function (knex, Promise) {
    return knex.schema.createTable('ROLES', function (table) {
        table.increments('idRol').unsigned().primary();
        table.string('nombre').notNullable();
        table.string('descripcion').notNullable();
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('ROLES');
};
