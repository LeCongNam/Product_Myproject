const express = require('express')
const router = express.Router()

const AdminController = require('../admin/controllers')
const userSchemas = require('../user/dto')
const productSchemas = require('../product/dto')
const JWT = require('../../modules/jwt/jwt')
const { param } = require('express-validator')

// constant
const adminController = new AdminController()
const jwtService = new JWT()

router.get(
    '/product',
    jwtService.verifyRole(['admin']),
    productSchemas.getAllProductByAdminSchemas,
    adminController.getAllProduct
)

router.get(
    '/product/:id',
    jwtService.verifyRole(['admin']),
    param('id').isInt(),
    adminController.getOneProductByAdmin
)

router.post(
    '/save-product',
    jwtService.verifyRole(['admin']),
    productSchemas.saveProduct,
    adminController.saveProduct
)

router.put(
    '/edit-product',
    jwtService.verifyRole(['admin']),
    productSchemas.editProduct,
    adminController.editProduct
)

router.get(
    '/user',
    jwtService.verifyRole(['admin']),
    userSchemas.getAllUser,
    adminController.getAllUser
)

module.exports = router
