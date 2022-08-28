/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up =async function(knex) {
    const isProduct = await knex.schema.hasTable('tb_product')
    if (!isProduct) {
        return await knex.schema.createTable('tb_product', function (table) {
            table.increments('id').primary();
            table.string('product_name').notNullable();
            table.decimal('price').notNullable();
            table.integer('quantity').notNullable();
            table.string('img').nullable().defaultTo(null);
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
exports.down = function() {
  
};
