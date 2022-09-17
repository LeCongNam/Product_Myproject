const express = require('express')
const router = express.Router()

const productRouter = require('./product.router')
const userRouter = require('./user.router')

router.use('/product', productRouter)
router.use('/user', userRouter)

module.exports = router
