import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
    return knex.schema.createTable('notification_type', table => {
        table.increments('id').primary();
        table.string('type').notNullable();
    });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
    return knex.schema.dropTable('notification_type');
}
