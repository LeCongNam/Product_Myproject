const _ = require('lodash')
const Validator = require('../../lib/until/validation')
const ProductService = require('../product/services')
const UserServices = require('../user/services')

class ProductController {
    productService
    userServices

    constructor() {
        this.productService = new ProductService()
        this.userServices = new UserServices()
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
        try {
            const body = _.pick(req.body, [
                'id',
                'productName',
                'price',
                'quantity',
                'img',
                'isInactived',
                'isDeleted',
            ])
            const { success } = await this.productService.editProduct(body)
            if (success)
                return res.json({
                    message: 'Edit Product Success',
                })
            return res.json({
                message: 'Edit Product Fail',
            })
        } catch (error) {
            throw error
        }
    }

    getOneProductByAdmin = async (req, res) => {
        const isValid = await Validator(req, res)
        if (!isValid) return
        try {
            const response = await this.productService.findOne(req)
            return res.status(200).type('json').json({
                data: response,
                message: 'Get One Product Success',
            })
        } catch (error) {
            throw error
        }
    }

    getAllUser = async (req, res) => {
        const isValid = await Validator(req, res)
        if (!isValid) return
        const response = await this.userServices.findAllUserByAdmin(req)
        return res
            .status(200)
            .type('json')
            .json({
                ...(response || []),
            })
    }
}

module.exports = ProductController
