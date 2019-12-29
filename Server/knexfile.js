;
const databaseData = {
    client: process.env.CLIENT || 'mysql',
    connection: process.env.CONNECTION_DB || {
        host: 'localhost',
        port: '3306',
        user: 'iepi',
        password: '123456789',
        database: 'pspi'
    }
};

module.exports = {

    development: {
        migrations: {tableName: 'knex_migrations', directory: './database/migrations'},
        seeds: {directory: './database/seeds'},
        client: databaseData.client,
        connection: databaseData.connection

    },
};
