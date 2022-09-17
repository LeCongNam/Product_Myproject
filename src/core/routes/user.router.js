const express = require('express')
const router = express.Router()

const UserController = require('../user/controllers')
const JWTServices = require('../../modules/jwt/jwt')
const userSchemas = require('../user/dto')

// constants
const userController = new UserController()
const jwtServices = new JWTServices()

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

module.exports = router
