/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    const isUpdatedBy = await knex.schema.hasColumn('tb_user', 'updatedBy')
    if (!isUpdatedBy) {
        await knex.schema.alterTable('tb_user', (Table) => {
            Table.string('updatedBy')
        })
    }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function () {}
