/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    const isMemo = await knex.schema.hasColumn('tb_user', 'memo')
    if (!isMemo) {
        await knex.schema.alterTable('tb_user', (Table) => {
            Table.string('memo')
        })
    }
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function () {}
