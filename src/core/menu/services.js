const RecordService = require('../../lib/until/record')
const knex = require('../../database/knex')
const { standardMenuSearch } = require('./constants')
const { ERecord } = require('../../lib/enum/enum')

class MenuServices extends RecordService {
    constructor() {
        super()
    }

    findAll = async (req) => {
        try {
            const filters = {}
            const likes = []
            for (const param in req.query) {
                if (param) {
                    if (param === 'categoryId')
                        filters[`${ERecord.menu}.${param}`] = [req.query[param]]
                }
            }
            const data = await this.createSearch({
                ...standardMenuSearch,
                filters: {
                    ...standardMenuSearch.filters,
                    ...filters,
                },
                likes,
            })
            return data
        } catch (error) {
            throw error
        }
    }

    findOne = async (req) => {
        return await this.createSearch({
            type: ERecord.product,
            results: [`${ERecord.product}.*`],
            filters: {
                [`${ERecord.product}.id`]: [req.params.id],
            },
        })
    }

    saveProduct = async (newData) => {
        const trn = await knex.transaction()
        try {
            const findUserExits = await this.createSearch({
                type: ERecord.product,
                results: [`${ERecord.product}.id`],
                filters: {
                    [`${ERecord.product}.isDeleted`]: [0],
                    [`${ERecord.product}.isInactived`]: [0],
                    [`${ERecord.product}.productName`]: [newData.productName],
                },
            })
            if (findUserExits.length > 0) {
                throw Error('Duplicate Product!')
            }

            await knex(`${ERecord.product}`).insert(newData).transacting(trn)

            await trn.commit()
            return {
                success: true,
            }
        } catch (error) {
            await trn.rollback()
            throw error
        }
    }

    editProduct = async (newData) => {
        const trn = await knex.transaction()
        try {
            const findUserExits = await this.createSearch({
                type: ERecord.product,
                results: [`${ERecord.product}.id`],
                filters: {
                    [`${ERecord.product}.isDeleted`]: [0],
                    [`${ERecord.product}.isInactived`]: [0],
                    [`${ERecord.product}.id`]: [newData.id],
                },
            })
            if (findUserExits.length === 0) {
                throw Error('Product Not Found!')
            }

            await knex(`${ERecord.product}`)
                .where('id', '=', newData.id)
                .update({
                    ...newData,
                    updatedAt: knex.raw('now()'),
                })
                .transacting(trn)

            await trn.commit()
            return {
                success: true,
            }
        } catch (error) {
            await trn.rollback()
            throw error
        }
    }
}

module.exports = MenuServices
