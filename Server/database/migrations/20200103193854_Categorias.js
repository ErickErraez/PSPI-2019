
exports.up = function(knex, Promise) {
    return knex.schema.createTable('Categorias', function (table) {
        table.increments('idCategorias').unsigned().primary();
        table.string('nombre').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('Categorias');
};
