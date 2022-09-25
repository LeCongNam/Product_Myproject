const jwt = require('jsonwebtoken')
const RecordService = require('../../lib/until/record')
const { ERecord } = require('../../lib/enum/enum')
const bcrypt = require('bcrypt')
const { PRIVATE_KEY } = require('../../lib/config/config')
const _ = require('lodash')
class JWT extends RecordService {
    constructor() {
        super()
    }

    generalToken = async ({ id }) => {
        const privateKey = PRIVATE_KEY
        const accessToken = jwt.sign(
            {
                data: id,
            },
            privateKey,
            {
                expiresIn: '90d', // 3 thang
            }
        )
        const refreshToken = jwt.sign(
            {
                data: id,
            },
            privateKey,
            { expiresIn: '180d' } //6 thangs
        )
        return {
            accessToken,
            refreshToken,
        }
    }

    decodeToken = async (token) => {
        try {
            if (!token) {
                return false
            }
            const id = jwt.decode(token)
            if (id) return id
            else return false
        } catch (error) {
            throw error
        }
    }

    verifyToken = async (token) => {
        try {
            const privateKey = PRIVATE_KEY
            const id = jwt.verify(token, privateKey)
            return id
        } catch (error) {
            return false
        }
    }
    comparePassword = async (data) => {
        try {
            const match = await bcrypt.compare(data.password, data.dbPassword)
            if (match) {
                return true
            } else {
                return false
            }
        } catch (error) {
            throw error
        }
    }
    verifyRole =
        (role = []) =>
        async (req, res, next) => {
            try {
                const bearToken = req.headers.authorization
                if (!_.isEmpty(bearToken)) {
                    const tokenClient = bearToken.split(' ')[1]
                    const isValidToke = await this.verifyToken(tokenClient)
                    if (!isValidToke) throw new Error('Token Invalid')
                    if (role.length === 0) {
                        const tokenDecode = await this.decodeToken(tokenClient)
                        const userInfo = await this.createSearch({
                            type: ERecord.user,
                            results: [
                                `${ERecord.user}.id`,
                                `${ERecord.user}.role`,
                            ],
                            filters: {
                                [`${ERecord.user}.id`]: [tokenDecode.data],
                                [`${ERecord.user}.isDeleted`]: [0],
                                [`${ERecord.user}.isInactived`]: [0],
                            },
                        })
                        if (userInfo.length === 0)
                            throw new Error('User Not Found Middleware')
                        req.headers.author = userInfo[0].id
                        return next()
                    }
                    const userInfo = await this.createSearch({
                        type: ERecord.user,
                        results: [`${ERecord.user}.id`, `${ERecord.user}.role`],
                        filters: {
                            [`${ERecord.user}.id`]: [isValidToke.data],
                            [`${ERecord.user}.isDeleted`]: [0],
                            [`${ERecord.user}.isInactived`]: [0],
                        },
                    })
                    const isRole = role.includes(userInfo[0].role)
                    if (isRole) {
                        req.headers.author = userInfo[0].id
                        return next()
                    }
                }
                return res.status(401).json({
                    messageCode: 'Permission Denined!!!',
                })
            } catch (error) {
                throw error
            }
        }

    hasPassword = async (password) => {
        try {
            const saltRounds = 10
            const hashedPassword = await bcrypt.hash(password, saltRounds)
            return hashedPassword
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = JWT
