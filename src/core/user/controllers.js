const _ = require('lodash')
const Validator = require('../../lib/until/validation')

// constant
const UserService = require('./services')
const ProductService = require('../product/services')
const JWTService = require('../../modules/jwt/jwt')
const constants = require('./constants')

class UserController {
    userService
    jwtService
    constructor() {
        this.userService = new UserService()
        this.jwtService = new JWTService()
        this.productService = new ProductService()
    }

    register = async (req, res) => {
        const isValid = await Validator(req, res)
        if (!isValid) return
        const { author } = req.headers
        const body = _.pick(req.body, constants.pickUserRegister)
        const { success } = await this.userService.register(body, author)

        if (success)
            return res.json({
                messageCode: '200a',
                x,
            })
        return res.json({
            messageCode: '420d',
        })
    }

    login = async (req, res) => {
        const isValid = await Validator(req, res)
        if (!isValid) return
        try {
            const body = _.pick(req.body, ['email', 'password'])
            const findUser = await this.userService.findOne(body)
            if (findUser.length === 0) throw new Error('User not found')
            const isValidPass = await this.jwtService.comparePassword({
                password: body.password,
                dbPassword: findUser[0].password,
            })
            if (isValidPass) {
                const token = await this.jwtService.generalToken({
                    id: `${findUser[0].id}`,
                })
                return res.json({
                    messageCode: 'Success',
                    data: token,
                })
            } else {
                return res.json({
                    messageCode: 'Login Fail',
                })
            }
        } catch (error) {
            throw error
        }
    }

    refreshToken = async (req, res) => {
        const isValid = await Validator(req, res)
        if (!isValid) return
        const bearToken = req.headers.authorization
        const tokenClient = bearToken.split(' ')[1]
        const tokenDecode = await this.jwtService.decodeToken(tokenClient)
        if (tokenDecode) {
            const findUser = await this.userService.findOne({
                id: tokenDecode['data'],
            })
            if (findUser.length > 0) {
                const { accessToken } = await this.jwtService.generalToken({
                    id: findUser[0].data,
                })
                return res.json({
                    messageCode: 'Refresh token Success',
                    data: accessToken || [],
                })
            }
        }
        return res.json({
            messageCode: 'Refresh token Fail',
        })
    }

    getProfile = async (req, res) => {
        const isValid = await Validator(req, res)
        if (!isValid) return
        const { author } = req.headers
        const findUser = await this.userService.findOne({ id: author })
        return res.json({
            messageCode: 'success',
            data: findUser,
        })
    }

    editProfile = async (req, res) => {
        const isValid = await Validator(req, res)
        if (!isValid) return
        const { author } = req.headers
        const body = _.pick(req.body, constants.pickUserRegister)
        await this.userService.editProfile(body, author)
        return res.json({
            messageCode: 'success',
        })
    }

    getDetailProduct = async (req, res) => {
        const isValid = await Validator(req, res)
        if (!isValid) return
        const response = await this.productService.findOne(req)
        return res.json({
            data: { ...response[0] },
        })
    }
}

module.exports = UserController
