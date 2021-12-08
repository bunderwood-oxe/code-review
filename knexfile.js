const knexConfig = (filePath = '.') => {
    const logger = require('./server/src/services/logger/logger');

    return {
        development: {
            debug: false,
            client: 'sqlite3',
            connection: {
                filename: './dev.gui.sqlite3',
            },
            useNullAsDefault: true,
            migrations: {
                directory: './server/db/migrations',
                extension: 'ts',
            },
            seeds: {
                directory: './server/db/seeds',
                extension: 'ts',
            },
            pool: {
                afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb),
            },
            log: {
                warn(message) {
                    logger.warning(JSON.stringify(message));
                },
                error(message) {
                    logger.error(JSON.stringify(message));
                },
                deprecate(message) {
                    logger.info(JSON.stringify(message));
                },
                debug(message) {
                    logger.info(JSON.stringify(message)); // log query details if .debug(true) added to any knex query
                },
            },
        },
        test: {
            debug: true,
            client: 'sqlite3',
            connection: { filename: ':memory:' },
            useNullAsDefault: true,
            migrations: {
                directory: './server/db/migrations',
                extension: 'ts',
            },
            seeds: {
                directory: './server/db/seeds',
                extension: 'ts',
            },
            pool: {
                afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = OFF', cb), // simplify tests
            },
        },
    };
};

module.exports = knexConfig;
