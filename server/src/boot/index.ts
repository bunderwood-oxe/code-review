import db from './db';

export default async function boot(): Promise<void> {
    await db();
}
