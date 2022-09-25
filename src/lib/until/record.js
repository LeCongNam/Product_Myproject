/**
 *
 * @type : product_manager.tb_user
 * @results : [ `tb_user.id`, `tb_user.first_name`]
 * @filters : { [`tb_user.isInactived`]:[0] }
 * @raw : `tb_user.id = id`
 * @joins : [
 *  {table: 'brand', first: 'tb_user.id', second; 'brand.userid'},
 *  {table: 'brand2', first: 'tb_user.id', second; 'brand2.userid'},
 * ]
 * @likes likes = [{ field: user.name, value: 'lecongnam' }]
 */

const knex = require('../../database/knex')

class RecordService {
    createSearch = async (search) => {
        try {
            // console.log('Search: ', search) //debug
            const query = knex(search.type).select(search.results)
            const queryCount = knex(search.type).select(search.results)
            let data = []
            for (const key in search.filters) {
                query.whereIn(key, search.filters[key])
                queryCount.whereIn(key, search.filters[key])
            }

            if (search.joins) {
                for (const item of search.joins) {
                    query.innerJoin(item.table, item.first, item.second)
                    queryCount.innerJoin(item.table, item.first, item.second)
                }
            }

            if (search.likes) {
                for (const like of search.likes) {
                    query.where(
                        like.field,
                        'like',
                        `%${like.value.replaceAll('%', '\\%')}%`
                    )
                }
            }

            if (!search.pagination) {
                data = await query.where([])
                // console.log(query.toSQL().toNative()) //debug
                return [...(data || [])]
            }

            let { limit, offset } = search.pagination
            limit = limit >= 0 ? limit : 10
            offset = offset >= 0 ? limit * offset : 0

            data = await query.limit(limit).offset(offset)
            // console.log({ Pagination: query.toSQL().toNative() }) //debug
            const rescount = await queryCount
                .count(`${search.type}.id as total`)
                .first()

            const pagination = {
                limit: limit || 10,
                offset: offset || 0,
                total: rescount?.total ? rescount?.total : 0,
            }

            return {
                data,
                pagination,
            }
        } catch (error) {
            // console.log('Error: ', error) //debug
            throw new Error(error)
        }
    }
}

module.exports = RecordService
