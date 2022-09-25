const express = require('express')
const router = express.Router()

const UserController = require('../user/controllers')
const JWTServices = require('../../modules/jwt/jwt')
const ProductController = require('../product/controllers')

const userSchemas = require('../user/dto')
const productSchemas = require('../product/dto')

// constants
const userController = new UserController()
const jwtServices = new JWTServices()
const productController = new ProductController()

router.post('/register', userSchemas.registerSchema, userController.register)

router.post('/login', userSchemas.loginSchema, userController.login)

router.post(
    '/refresh-token',
    jwtServices.verifyRole([]),
    userController.refreshToken
)

router.get('/profile', jwtServices.verifyRole([]), userController.getProfile)

router.put(
    '/profile',
    jwtServices.verifyRole([]),
    userSchemas.editProfileSchema,
    userController.editProfile
)

router.get(
    '/product',
    productSchemas.getAllProductSchemas,
    productController.getAllProduct
)
module.exports = router
