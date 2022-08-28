// const Knex = require('../knex');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


exports.up = async function (knex) {
    const isUserTable = await knex.schema.hasTable('fd_user')
    if (!isUserTable) {
        return await knex.schema.createTable('tb_user', function (table) {
            table.uuid('id').defaultTo('uuid_generate_v4()').primary();
            table.string('first_name', 50).notNullable();
            table.string('last_name', 50).notNullable();
            table.string('email', 255).notNullable();
            table.timestamp('dob').notNullable(knex.fn.now());
            table.string('gender', 10).notNullable();
            table.string('role', 10).notNullable();
            table.string('phone', 25).notNullable();
            table.string('address', 255).notNullable();
            table.timestamp('createdAt').defaultTo(knex.fn.now())
            table.timestamp('updatedAt').defaultTo(knex.fn.now())
            table.boolean('isInactived').defaultTo(false)
            table.boolean('isDeleted').defaultTo(false)
        })
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down =  function () {
};
