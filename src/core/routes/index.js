const express = require('express')
const router = express.Router()

const userRouter = require('./user.router')
const adminRouter = require('./admin.router')
const menuRouter = require('./menu.router')

router.use('/admin', adminRouter)
router.use('/user', userRouter)
router.use('/menu', menuRouter)

module.exports = router
