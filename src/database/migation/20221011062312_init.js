/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
    const isMenu = await knex.schema.hasTable('tb_menu')
    if (!isMenu)
        await knex.schema.createTable('tb_menu', (Table) => {
            Table.increments('id').primary().notNullable()
            Table.string('content')
            Table.integer('categoryId')
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
