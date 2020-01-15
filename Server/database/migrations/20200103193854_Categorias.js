
exports.up = function(knex, Promise) {
    return knex.schema.createTable('Categorias', function (table) {
        table.increments('idCategorias').unsigned().primary();
        table.string('nombre',100).notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('Categorias');
};
