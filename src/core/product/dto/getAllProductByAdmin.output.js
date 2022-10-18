const { checkSchema } = require('express-validator')

const getAllProduct = checkSchema({
    limit: {
        isInt: true,
    },
    offset: {
        isInt: true,
    },
    name: {
        isString: true,
        optional: { options: { nullable: true } },
        // matches: { options: [/\b(?:1|0)\b/] },
    },
    isInactived: {
        isBoolean: true,
        optional: { options: { nullable: true } },
        matches: { options: [/\b(?:1|0)\b/] },
    },
})

module.exports = getAllProduct
