/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
    const isPassword = await knex.schema.hasColumn('tb_user', 'password')
    if (!isPassword) {
        await knex.schema.alterTable('tb_user', (Table) => {
            Table.string('password')
        })
    }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function () {}
