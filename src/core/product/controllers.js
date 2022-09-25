const _ = require('lodash')
const Validator = require('../../lib/until/validation')
const ProductService = require('./services')

class ProductController {
    productService

    constructor() {
        this.productService = new ProductService()
    }

    getAllProduct = async (req, res) => {
        const isValid = await Validator(req, res)
        if (!isValid) return
        try {
            const result = await this.productService.findAll(req)
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
            const { success } = await this.productService.saveProduct(body)
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
        const { success } = await this.productService.editProduct(body)
        if (success)
            return res.json({
                message: 'Edit Product Success',
            })
        return res.json({
            message: 'Edit Product Fail',
        })
    }
}

module.exports = ProductController
