
exports.up = function(knex, Promise) {
    return knex.schema.createTable('PeriodoAcademico', function (table) {
        table.increments('idPeriodoAcademico').unsigned().primary();
        table.string('nombre').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('PeriodoAcademico');
};
