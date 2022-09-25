const { checkSchema } = require('express-validator')

const Login = checkSchema({
    limit: {
        isInt: true,
    },
    offset: {
        isInt: true,
    },
    name: {
        isString: true,
        optional: { options: { nullable: true } },
    },
    isInactived: {
        isBoolean: true,
        optional: { options: { nullable: true } },
        matches: { options: [/\b(?:1|0)\b/] },
    },
    isDeleted: {
        isBoolean: true,
        optional: { options: { nullable: true } },
        matches: { options: [/\b(?:1|0)\b/] },
    },
})

module.exports = Login
