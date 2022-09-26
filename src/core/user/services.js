const RecordService = require('../../lib/until/record')
const knex = require('../../database/knex')
const {
    standardUserSearch,
    adminFindAllUser,
    searchUserByAdmin,
} = require('./constants')
const { ERecord } = require('../../lib/enum/enum')
const JWT = require('../../modules/jwt/jwt')
const moment = require('moment')

class UserServices extends RecordService {
    jwtServices
    constructor() {
        super()
        this.jwtServices = new JWT()
    }

    findAll = async () => {
        let raw = ''
        for (const param in req.query) {
            if (param) {
                if (param === 'name') {
                    raw += ` (${ERecord.user}.firstName like "%${req.query[param]}%" or ${ERecord.user}.lastName like "%${req.query[param]}%") `
                }
            }
        }
        return await this.createSearch({
            ...standardUserSearch,
            raw,
        })
    }

    findOne = async (search) => {
        const filters = {}
        for (const param in search) {
            if (param === 'email' || param === 'id')
                filters[`${ERecord.user}.${param}`] = [search[param]]
        }
        return await this.createSearch({
            ...standardUserSearch,
            filters: {
                ...standardUserSearch.filters,
                ...filters,
            },
        })
    }

    findOneByAdmin = async (req) => {
        return await this.createSearch({
            ...searchUserByAdmin,
            filters: {
                ...searchUserByAdmin.filters,
                [`${ERecord.user}.id`]: [req.params.id],
            },
        })
    }

    findAllUserByAdmin = async (req) => {
        const filters = {}
        for (const param in req.query) {
            if (
                param === 'email' ||
                param === 'id' ||
                param == 'isDeleted' ||
                param == 'isInactived'
            )
                filters[`${ERecord.user}.${param}`] = [req.query[param]]
        }
        return await this.createSearch({
            ...adminFindAllUser,
            filters: {
                ...filters,
            },
            pagination: { limit: req.query.limit, offset: req.query.offset },
        })
    }

    register = async (newData) => {
        let currData
        const trn = await knex.transaction()
        try {
            const findUserExits = await this.createSearch({
                type: ERecord.user,
                results: [`${ERecord.user}.id`],
                filters: {
                    [`${ERecord.user}.isDeleted`]: [0],
                    [`${ERecord.user}.isInactived`]: [0],
                    [`${ERecord.user}.email`]: [newData?.email],
                },
            })
            if (findUserExits.length > 0) {
                throw Error('Duplicate Email!')
            }
            const hasPassword = await this.jwtServices.hasPassword(
                newData.password
            )
            newData.password = hasPassword
            newData.dob = moment(newData.dob).format('YYYY/MM/DD')
            currData = await knex(`${ERecord.user}`)
                .insert({
                    ...newData,
                    id: knex.raw('UUID()'),
                })
                .transacting(trn)

            await knex(`${ERecord.user}`).where('id', currData[0]).first()
            await trn.commit()
            return {
                success: true,
            }
        } catch (error) {
            await trn.rollback()
            throw error
        }
    }

    editProfile = async (newData, author) => {
        const trn = await knex.transaction()
        try {
            const findUserExits = await this.createSearch({
                type: ERecord.user,
                results: [`${ERecord.user}.id`],
                filters: {
                    [`${ERecord.user}.isDeleted`]: [0],
                    [`${ERecord.user}.isInactived`]: [0],
                    [`${ERecord.user}.id`]: [author],
                },
            })
            if (findUserExits.length === 0) {
                throw Error('User Not Exits')
            }

            newData && (newData.dob = moment(newData.dob).format('YYYY-MM-DD'))
            await knex(`${ERecord.user}`)
                .where('id', '=', author)
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

    save = async (newData) => {
        const trn = await knex.transaction()
        try {
            const findUserExits = await this.createSearch({
                type: ERecord.user,
                results: [`${ERecord.user}.id`],
                filters: {
                    [`${ERecord.user}.isDeleted`]: [0],
                    [`${ERecord.user}.id`]: [newData.id],
                },
            })
            if (findUserExits.length === 0) {
                throw Error('User  Not found!')
            }

            await knex(`${ERecord.user}`)
                .transacting(trn)
                .where('id', '=', newData.id)
                .update(newData)

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

module.exports = UserServices
