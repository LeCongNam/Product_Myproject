/**
 * 
 * type: product_manager.tb_user
 * results: [ `tb_user.id`, `tb_user.first_name`]
 * filters: { [`tb_user.isInactived`]:[0] }
 * raw: `tb_user.id = id`
 * joins : [
 *  {table: 'brand', first: 'tb_user.id', second; 'brand.userid'},
 *  {table: 'brand2', first: 'tb_user.id', second; 'brand2.userid'},
 * ]
 */
// const knex = require('knex');
const knex = require('../../database/knex');

class RecordService {
    constructor() {
        this.createSearch
    }

    createSearch = async (search) => {
        try {
            const query = knex(search.type).select(search.results)
            // console.log({ 'CreateSearch': query.toSQL().toNative() }); //debug
            let data = []
            let pagination 
            let filters = []

            const fields = Object.keys(search.filters || {})
            if (!search.filters)
                search.filters = {}
            if (fields.length > 0) {
                for (const key of fields) {
                    data = query.whereIn(key, search.filters[key])
                }
            }
            // console.log( query.toSQL().toNative() ); //debug

            if(search.joins){
                for (const item of search.joins) {
                    data = query.innerJoin(item.table, item.first, item.second)
                }
            }

            if (search.pagination) {
                let total
                let { limit, offset } = search.pagination
                const skipItem = (offset -1)* limit
                offset = skipItem < 0 ?0: offset
                data = await query
                    .limit(limit)
                    .offset(offset)
                // console.log({ 'Pagination': query.toSQL().toNative() }); //debug
                const rescount = await query.count(`${search.type}.id as total`).first()

                pagination = {
                    limit: limit || 10,
                    offset: offset || 0,
                    total: total = rescount?.total ?rescount?.total : 0
                }

            } else {
                data = await query.where([]) 
            }

            return {
                data,
                pagination
            }

        } catch (error) {
            // console.log("Error: ", error);
            throw new Error(error)
        }

    }


    /**
     * 
     */
    findOne = async (tableName)=>{
        try {
            return await knex(tableName).select('*').first()
        } catch (error) {
            throw error            
        }
    }

}

module.exports = RecordService