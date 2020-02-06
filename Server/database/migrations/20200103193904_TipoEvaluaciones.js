
exports.up = function(knex, Promise) {
    return knex.schema.createTable('TipoEvaluaciones', function (table) {
        table.increments('idTipoEvaluaciones').unsigned().primary();
        table.string('tipo', ).notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('TipoEvaluaciones');
};
