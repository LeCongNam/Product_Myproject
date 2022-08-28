const _ = require('lodash');
const Validator = require('../../lib/until/validation');
const { validationResult } = require('express-validator')
const ProductService = require('./services');

class ProductController {
    productService
    constructor(){
        this.productService= new ProductService()
    }

    getAllProduct = async (req, res) => {
       try {
        const isValid = await Validator(req, res)
        if (!isValid) return
        const result =  await this.productService.findAll()

        return res.json(result)
       } catch (error) {
        console.log(error);
            throw new Error(error)
       }
    }
}

module.exports = ProductController