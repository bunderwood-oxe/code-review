import getDBConnection, { initialize } from '../../db/db';

export default async function boot(): Promise<void> {
    const db = getDBConnection();
    try {
        await initialize(db);
    } catch (err) {
        process.exitCode = 1;
        throw err;
    }
}
