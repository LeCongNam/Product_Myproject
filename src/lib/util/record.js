/**
 * 
 * type: product_manager.tb_user
 * results: [ `tb_user.id`, `tb_user.first_name`]
 * filters: { [`tb_user.isInactived`]:[0] }
 * raw: `tb_user.id = id`
 */
// const knex = require('knex');
const knex = require('../../database/knex');

class ERecord {
    constructor() {
        this.createSearch
    }

    createSearch = async (search) => {
        try {
            let data = []
            let pagination = {}
            let filters = []
            const query = knex(search.type).select(search.results)
            const fields = Object.keys(search.filters || {})
            console.log(fields);
            if (!search.filters)
                search.filters = {}
            if (fields.length > 0) {
                for (const key of fields) {
                    filters.push(search.filters[key])
                }
                data = query.whereIn(fields, filters)
                console.log({ 'Filters': query.toSQL().toNative() }); //debug
            } else {
                data = query.where([])
            }


            if (search.pagination) {
                const { limit, offset } = search.pagination
                data = await query
                    .limit(limit)
                    .offset(offset)

                const rescount = await query.count('id as total').first()

                pagination = {
                    limit: limit || 10,
                    offset: offset || 0,
                    total: rescount['total'] || 0
                }

                return {
                    data,
                    pagination
                }
            } else {
                data = await query.where([])
                return {
                    data
                }
            }



        } catch (error) {
            throw error
        }

    }

}

module.exports = ERecord