import type { Knex } from 'knex';

const notifications = [
    {
        typeId: 1,
        subject: 'room1',
        body: 'nurse call button',
        reminderMinutes: 0,
        updated_at: Date.now() - 60 * 60 * 1000,
    },
    {
        typeId: 1,
        subject: 'room1',
        body: 'nurse call button',
        reminderMinutes: 0,
        updated_at: Date.now(),
    },
    {
        typeId: 1,
        subject: 'room2',
        body: 'nurse call button',
        reminderMinutes: 0,
        updated_at: Date.now(),
    },
];

export async function seed(knex: Knex): Promise<void> {
    // Inserts seed entries
    return knex('notification')
        .delete()
        .then(_res => {
            return knex('notification').insert(notifications);
        });
}
