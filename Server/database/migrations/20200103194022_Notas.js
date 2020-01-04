exports.up = function (knex, Promise) {
    return knex.schema.createTable('Notas', function (table) {
        table.increments('idNotas').unsigned().primary();
        table.date('fechaLimite').notNullable();
        table.date('fechaEntrega').notNullable();
        table.integer('nota').notNullable();
        table.string('calificador').notNullable();
        table.integer('idTipoEvaluacion').unsigned().references('idTipoEvaluaciones').inTable('TipoEvaluaciones');
        table.integer('idUsuariosProyectos').unsigned().references('idUsuariosProyectos').inTable('UsuariosProyectos');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('Notas');
};
