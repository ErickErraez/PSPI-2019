exports.up = function (knex, Promise) {
    return knex.schema.createTable('Usuarios', function (table) {
        table.increments('idUsuarios').unsigned().primary();
        table.string('nombre').notNullable();
        table.string('apellido').notNullable();
        table.string('cedula').notNullable();
        table.string('correo').notNullable();
        table.string('nivel').notNullable();
        table.integer('idRol').unsigned().references('idRoles').inTable('Roles');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('Usuarios');
};
