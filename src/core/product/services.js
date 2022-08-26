const RecordService = require('../../lib/util/record');
const knex = require('../../database/knex');


class ProductService extends RecordService {
    constructor() {
        super()
    }

    findAll = async () => {
        try {
            const data = await this.createSearch({
                type: 'tb_product',
                results: ['tb_product.id','product_name', 'price','quantity', 'first_name'],
                filters: {
                    [`tb_product.product_name`]:['sp1']
                },
                pagination: {limit :10, offset: 0},
                joins:[
                    {table: 'tb_user',first: 'tb_user.id', second: 'tb_product.id'}
                ]
            })
            return data
        } catch (error) {
            throw error
        }
    }
}

module.exports = ProductService