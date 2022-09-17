const { checkSchema } = require('express-validator')

const Login = checkSchema({
    email: {
        isEmail: true,
        notEmpty: false,
        optional: { options: { nullable: true } },
    },
    firtsName: {
        isString: true,
        notEmpty: false,
        optional: { options: { nullable: true } },
    },
    lastName: {
        isString: true,
        notEmpty: false,
        optional: { options: { nullable: true } },
    },
    address: {
        isString: true,
        notEmpty: false,
        optional: { options: { nullable: true } },
    },
    dob: {
        isISO8601: true,
        notEmpty: false,
        optional: { options: { nullable: true } },
    },
    phone: {
        isString: true,
        notEmpty: false,
        optional: { options: { nullable: true } },
    },
    gender: {
        isString: true,
        notEmpty: false,
        optional: { options: { nullable: true } },
        matches: { options: [/\b(?:male|female|orther)\b/] },
    },
    avatar: {
        isString: true,
        notEmpty: false,
        optional: { options: { nullable: true } },
    },
    isDeleted: {
        isBoolean: true,
        optional: { options: { nullable: true } },
    },
})

module.exports = Login
