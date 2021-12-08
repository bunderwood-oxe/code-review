import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
    return knex.schema.createTable('notification', table => {
        table.increments('id').primary();
        table.integer('typeId').notNullable();
        table.string('subject');
        table.string('body');
        table.integer('reminderMinutes');
        table.integer('updated_at').notNullable();
        table.foreign('typeId').references('notification_type.id');
    });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
    return knex.schema.dropTable('notification');
}
