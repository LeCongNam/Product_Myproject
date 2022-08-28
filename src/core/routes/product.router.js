const express = require('express');
const router = express.Router()

const ProductControler = require('../product/controllers');
const productSchemas = require('../product/dto');

const productControler = new ProductControler()

router.get('/',
    productSchemas.getAllProductSchemas,
    productControler.getAllProduct
)



module.exports = router