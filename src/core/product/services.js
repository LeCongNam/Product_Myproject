const RecordService = require('../../lib/util/record');
const knex = require('../../database/knex');


class ProductService extends RecordService {
    constructor() {
        super()
    }

    findAll = async (req) => {
        try {
            const data = await this.createSearch({
                type: 'tb_product',
                results: ['id','product_name', 'price','quantity'],
                filters: {
                    [`tb_product.product_name`]:['sp1']
                },
                pagination: {limit :10, offset: 2}
            })
            return data
        } catch (error) {
            throw error
        }
    }
}

module.exports = ProductService