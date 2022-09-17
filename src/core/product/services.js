const RecordService = require('../../lib/until/record')
const knex = require('../../database/knex')
const trn = require('../../lib/until/transaction')
const { standarProductSearch } = require('./constants')

class ProductService extends RecordService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()
    }

    findAll = async () => {
        try {
            const data = await this.createSearch(standarProductSearch)
            return data
        } catch (error) {
            throw error
        }
    }

    save = async (newData) => {
        trn.transaction()
        let method = 'POST'
        if (newData.id) method = 'PUT'
        if (newData.isDeleted) method = 'DELETE'

        try {
            if (method === 'POST') {
                await knex(`${ERecord.product}`).insert(newData)
            } else {
                if (method === 'PUT')
                    await knex(`${ERecord.product}`)
                        .where('id', '=', newData.id)
                        .update(newData)

                if (method === 'DELETE')
                    await knex(`${ERecord.product}`)
                        .where('id', '=', newData.id)
                        .update(newData)
            }

            trn.commit()
        } catch (error) {
            trn.rollBack()
            throw error
        }
    }
}

module.exports = ProductService
