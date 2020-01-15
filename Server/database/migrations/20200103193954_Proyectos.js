
exports.up = function(knex, Promise) {
    return knex.schema.createTable('Proyectos', function (table) {
        table.increments('idProyectos').unsigned().primary();
        table.string('nombre',100).notNullable();
        table.string('descripcion',200).notNullable();
        table.string('herramientas',200).notNullable();
        table.string('estado',10).notNullable();
        table.string('nivel',50).notNullable();
        table.integer('tutor').unsigned().references('idUsuarios').inTable('Usuarios');
        table.integer('jurado1').unsigned().references('idUsuarios').inTable('Usuarios');
        table.integer('jurado2').unsigned().references('idUsuarios').inTable('Usuarios');
        table.integer('idPeriodo').unsigned().references('idPeriodoAcademico').inTable('PeriodoAcademico');
        table.integer('idCategoria').unsigned().references('idCategorias').inTable('Categorias');
        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('Proyectos');
};
