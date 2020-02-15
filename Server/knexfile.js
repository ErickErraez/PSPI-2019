;
//cadena de conexion a la base de datos
const databaseData = {
    client: process.env.CLIENT || 'mysql',
    connection: process.env.CONNECTION_DB || {
        host: 'us-cdbr-iron-east-04.cleardb.net',
        port: '3306',
        user: 'b0562ba05a45d8',
        password: '75b422ce',
        database: 'heroku_068f349305bcc12'
    }
};
//configurar knex
module.exports = {
    development: {
        migrations: {tableName: 'knex_migrations', directory: './database/migrations'},
        seeds: {directory: './database/seeds'},
        client: databaseData.client,
        connection: databaseData.connection

    },
};
