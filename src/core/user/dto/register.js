const { checkSchema } = require('express-validator')

const Register = checkSchema({
    firstName: {
        isString: true,
        notEmpty: true,
    },
    lastName: {
        isString: true,
        notEmpty: true,
    },
    dob: {
        isISO8601: true,
    },
    email: {
        isEmail: true,
    },
    phone: {
        isString: true,
        custom: (value) => {
            const isPhone = value.test(/[^0]\ds/)
            if (isPhone) return true
            return false
        },
    },
    gender: {
        isString: true,
        matches: { options: [/\b(?:male|female|orther)\b/] },
        notEmpty: true,
    },
    address: {
        isString: true,
        notEmpty: true,
    },
})

module.exports = Register
