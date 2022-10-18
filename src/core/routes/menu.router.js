const express = require('express')
const router = express.Router()

const MenuController = require('../menu/controllers')
const menuSchemas = require('../menu/dto')
const JWT = require('../../modules/jwt/jwt')

// constant
const menuController = new MenuController()
const jwtService = new JWT()

router.get(
    '/',
    // jwtService.verifyRole(['']),
    menuSchemas.getAllmenu,
    menuController.getAllMenu
)

// router.get(
//     '/product/:id',
//     jwtService.verifyRole(['trader']),
//     param('id').isInt(),
//     adminController.getOneProductByAdmin
// )

// router.post(
//     '/save-product',
//     jwtService.verifyRole(['trader']),
//     productSchemas.saveProduct,
//     adminController.saveProduct
// )

// router.put(
//     '/edit-product',
//     jwtService.verifyRole(['trader']),
//     productSchemas.editProduct,
//     adminController.editProduct
// )

module.exports = router
