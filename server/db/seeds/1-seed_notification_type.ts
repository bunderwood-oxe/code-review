import type { Knex } from 'knex';

export const types = ['call-button'] as const;

export type NotificationTypeName = typeof types[number];

export async function seed(knex: Knex): Promise<void> {
    const notificationTypes = types.map((type, index) => ({ id: index + 1, type }));
    // Inserts seed entries
    return knex('notification_type')
        .select()
        .then(res => {
            const existingEntries = res;

            const newEntries = notificationTypes.filter(
                x => !existingEntries.some(e => e.id === x.id && e.type === x.type),
            );

            if (newEntries.length > 0) return knex('notification_type').insert(newEntries);
        });
}
