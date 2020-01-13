
exports.up = function(knex, Promise) {
    return knex.schema.createTable('TipoEvaluaciones', function (table) {
        table.increments('idTipoEvaluaciones').unsigned().primary();
        table.string('nombre', ).notNullable();
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('TipoEvaluaciones');
};
