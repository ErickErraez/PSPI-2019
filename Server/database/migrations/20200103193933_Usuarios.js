exports.up = function (knex, Promise) {
    return knex.schema.createTable('Usuarios', function (table) {
        table.increments('idUsuarios').unsigned().primary();
        table.string('nombre',50).notNullable();
        table.string('apellido',50).notNullable();
        table.string('cedula',10).notNullable();
        table.string('correo',50).notNullable();
        table.string('password',6).notNullable();
        table.string('nivel',10);
        table.integer('idRol').unsigned().references('idRoles').inTable('Roles');
        table.timestamps();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('Usuarios');
};
