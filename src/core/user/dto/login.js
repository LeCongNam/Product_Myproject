const { checkSchema } = require('express-validator')

const Login = checkSchema({
    email: {
        isEmail: true,
    },
    password: {
        isStrongPassword: true,
    },
})

module.exports = Login
