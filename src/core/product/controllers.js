const _ = require('lodash');
// const Validator = require('../../lib/util/validation');
const { validationResult } = require('express-validator')
const ProductService = require('./services');

class ProductController {
    productService
    constructor(){
        this.productService= new ProductService()
    }


    getAllProduct = async (req, res) => {
       try {
        const isValid = await validationResult(req, res)
        if (!isValid) throw new Error('400a') 
        const body = _.pick(req.body, ['id', 'name'])
        const result =  await this.productService.findAll()

        return res.json(result)
       } catch (error) {
        console.log(error);
            throw new Error(error)
       }
    }
}

module.exports = ProductController