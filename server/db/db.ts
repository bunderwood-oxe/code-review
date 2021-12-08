import knex from 'knex';
import knexfile from '../../knexfile';
import { logger } from '../src/services';

import type { Knex } from 'knex';

const env = process.env.NODE_ENV;

function getKnexfile(): Knex.Config {
    switch (env) {
        case 'development':
            return knexfile().development;
        case 'test':
            return knexfile().test;
        default:
            return knexfile().development;
    }
}

let db: Knex | undefined;

function getDBConnection(): Knex {
    if (db === undefined) {
        db = knex(getKnexfile());
        db.on('query-error', (err, query) => {
            logger.error(`knex error', ${err} - ${query.sql}`);
        });
    }
    return db;
}

/**
 * call initialize on gui start-up to ensure latest migrations are run and database seeded
 * according to `./knexfile.js` config
 */
async function initialize(db: Knex): Promise<void> {
    // begin migrations
    try {
        logger.info(`running latest db migrations and seeds for ${env}`);
        await db.migrate.latest().then(() => db.seed.run());
        logger.info(`completed running latest db migrations and seeds for ${env}`);
    } catch (err) {
        logger.error(`error running database migrations or seeds: ${err}`);
        throw err;
    }
    // begin database checks
    try {
        await db.raw('PRAGMA integrity_check;').then(rows => {
            // If pragma integrity_check finds no errors, a single row with the value 'ok' is returned.
            if (rows[0].integrity_check !== 'ok') throw new Error('failed PRAGMA integrity_check');
        });
        await db.raw('PRAGMA foreign_key_check;').then(rows => {
            // Returns one row output for each foreign key violation
            // If this fails under test - be sure to check that all required seeds have been created
            // particularly if new tables have been added
            if (rows.length > 0) throw new Error('failed PRAGMA foreign_key_check');
        });
        return;
    } catch (err) {
        logger.error(`error running database checks: ${err}`);
        throw err;
    }
}

export default getDBConnection;

export { getDBConnection, initialize, getKnexfile };
