const RecordService = require('../../lib/until/record');
const knex = require('../../database/knex');


class ProductService extends RecordService {
    constructor() {
        super()
    }

    findAll = async () => {
        try {
            const data = await this.createSearch()
            return data
        } catch (error) {
            throw error
        }
    }
}

module.exports = ProductService