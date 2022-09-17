/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    const isAvatar = await knex.schema.hasColumn('tb_user', 'avatar')
    if (!isAvatar) {
        await knex.schema.alterTable('tb_user', (Table) => {
            Table.string('avatar')
        })
    }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function () {}
