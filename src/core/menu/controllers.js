const _ = require('lodash')
const Validator = require('../../lib/until/validation')
const MenuServices = require('./services')

class MenuController {
    menuServices

    constructor() {
        this.menuServices = new MenuServices()
    }

    getAllMenu = async (req, res) => {
        const isValid = await Validator(req, res)
        if (!isValid) return
        try {
            const result = await this.menuServices.findAll(req)
            return res.json(result)
        } catch (error) {
            throw error
        }
    }

    saveProduct = async (req, res) => {
        const isValid = await Validator(req, res)
        if (!isValid) return
        try {
            const body = _.pick(req.body, [
                'productName',
                'price',
                'quantity',
                'img',
            ])
            const { success } = await this.MenuServices.saveProduct(body)
            if (success)
                return res.json({
                    message: 'Save Product Success',
                })
            return res.json({
                message: 'Save Product Fail',
            })
        } catch (error) {
            throw new Error(error)
        }
    }

    editProduct = async (req, res) => {
        const isValid = await Validator(req, res)
        if (!isValid) return
        const body = _.pick(req.body, [
            'id',
            'productName',
            'price',
            'quantity',
            'img',
        ])
        const { success } = await this.MenuServices.editProduct(body)
        if (success)
            return res.json({
                message: 'Edit Product Success',
            })
        return res.json({
            message: 'Edit Product Fail',
        })
    }
}

module.exports = MenuController
