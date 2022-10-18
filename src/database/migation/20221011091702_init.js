/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
    const isCategory = await knex.schema.hasTable('tb_category')
    if (!isCategory)
        await knex.schema.createTable('tb_category', (Table) => {
            Table.increments('id').primary().notNullable()
            Table.string('title')
            Table.string('name')
            Table.timestamp('createdAt').defaultTo(knex.fn.now())
            Table.timestamp('updatedAt').defaultTo(knex.fn.now())
            Table.boolean('isInactived').defaultTo(false)
            Table.boolean('isDeleted').defaultTo(false)
        })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function () {}
