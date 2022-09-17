const RecordService = require('../../lib/until/record')
const knex = require('../../database/knex')
const { standardUserSearch } = require('./constants')
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
                if (param == 'name') {
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
        for (const item in search) {
            if (item == 'email' || item == 'id')
                filters[`${ERecord.user}.${item}`] = [search[item]]
        }
        return await this.createSearch({
            ...standardUserSearch,
            filters: {
                ...standardUserSearch.filters,
                ...filters,
            },
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
}

module.exports = UserServices
