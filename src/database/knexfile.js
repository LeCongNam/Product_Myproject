// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    development: {
        client: 'mysql2',
        connection: {
            filename: `${__dirname}./knex.js`,
            host: 'localhost',
            user: 'root',
            password: 'Abcd123@',
            database: 'product_manager',
        },
        migrations: {
            directory: './migation',
        },
        seeds: {
            directory: '/seeds',
        },
    },

    staging: {
        client: 'mysql2',
        connection: {
            host: 'localhost',
            user: 'admin',
            password: 'Lecongnam97@',
            database: 'product_manager',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },

    production: {
        client: 'mysql2',
        connection: {
            host: 'localhost',
            user: 'admin',
            password: 'Lecongnam97@',
            database: 'product_manager',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },
}
