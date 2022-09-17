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
            const result = await this.productService.findAll()

            res.json(result)
        } catch (error) {
            throw new Error(error)
        }
    }

    saveProduct = async (req, res) => {
        try {
            const isValid = await Validator(req, res)
            if (!isValid) return
            const body = _.pick(req.body, [
                'product_name',
                'price',
                'quantity',
                'img',
            ])
            const response = await this.productService.findAll(body)

            res.json(response)
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = ProductController
