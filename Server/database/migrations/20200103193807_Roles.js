exports.up = function (knex, Promise) {
    return knex.schema.createTable('Roles', function (table) {
        table.increments('idRoles').unsigned().primary();
        table.string('nombre').notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('Roles');
};
