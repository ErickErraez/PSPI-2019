exports.up = function (knex, Promise) {
    return knex.schema.createTable('PERSONAS', function (table) {
        table.increments('idPersona').unsigned().primary();
        table.string('nombre').notNullable();
        table.string('apellido').notNullable();
        table.string('email').unique();
        table.string('contrasena').notNullable();
        table.integer('idRol').references('idRol').inTable('ROLES');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('PERSONAS');
};
