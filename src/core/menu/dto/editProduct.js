const { checkSchema } = require('express-validator')

const adminSaveProduct = checkSchema({
    id: {
        isInt: true,
    },
    productName: {
        isString: true,
        optional: { options: { nullable: true } },
    },
    price: {
        isFloat: true,
        optional: { options: { nullable: true } },
    },
    quantity: {
        isInt: true,
        optional: { options: { nullable: true } },
    },
    img: {
        isString: true,
        optional: { options: { nullable: true } },
    },
    isInactived: {
        isBoolean: true,
        matches: { options: [/\b(?:1|0)\b/] },
    },
    isDeleted: {
        isBoolean: true,
        matches: { options: [/\b(?:1|0)\b/] },
    },
})

module.exports = adminSaveProduct
