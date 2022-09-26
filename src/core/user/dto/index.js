const registerSchema = require('./register')
const loginSchema = require('./login')
const editProfileSchema = require('./editProfile')
const getAllUser = require('./getAllUser')
const saveUserByAdmin = require('./saveUserByAdmin')
module.exports = {
    registerSchema,
    loginSchema,
    editProfileSchema,
    getAllUser,
    saveUserByAdmin,
}
