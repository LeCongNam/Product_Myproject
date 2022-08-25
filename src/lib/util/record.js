/**
 * 
 * type: product_manager.tb_user
 * results: [ `tb_user.id`, `tb_user.first_name`]
 * filters: { [`tb_user.isInactived`]:[0] }
 * raw: `tb_user.id = id`
 */
const knex = require('knex');
// const knex = require('../../database/knex');
const { search } = require('../../server');

class ERecord {
    constructor(){
        this.createSearch
    }

    createSearch = async () => {
        try {
            let pickField = []
            let result = []
            let filters = {}

            for (let i = 0; i < search.result; i++) {
                pickField.push(search.result[i])
            }


            result = await knex
                .select(pickField)
                .from(search.type)
                .where((qb) => {
                    for (const key in search.filters) {
                        qb.where(key, "in", search.filters[key])
                    }
                })
                // .where(knex.raw(search.raw))

            return result
        } catch (error) {
            throw error
        }

    }

}

module.exports = ERecord