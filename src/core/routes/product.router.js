const express = require('express')
const router = express.Router()

const ProductControler = require('../product/controllers')
const productSchemas = require('../product/dto')
const JWT = require('../../modules/jwt/jwt')

// constant
const productControler = new ProductControler()
const jwtService = new JWT()

router.get(
    '/',
    productSchemas.getAllProductSchemas,
    jwtService.verifyRole(['admin']),
    productControler.getAllProduct
)

module.exports = router
