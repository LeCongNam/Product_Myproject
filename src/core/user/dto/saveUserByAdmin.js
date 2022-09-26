const { checkSchema } = require('express-validator')

const Login = checkSchema({
    id: {
        isUUID: true,
    },
    memo: {
        isString: true,
    },
    isInactived: {
        isBoolean: true,
    },
    isDeleted: {
        isBoolean: true,
    },
})

module.exports = Login
