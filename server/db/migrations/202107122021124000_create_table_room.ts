import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
    return knex.schema.createTable('room', table => {
        table.increments('id').primary();
        table.string('roomIdentifier').notNullable();
        table.string('label').notNullable();
    });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
    return knex.schema.dropTable('room');
}
