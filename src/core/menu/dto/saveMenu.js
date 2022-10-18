const { checkSchema } = require('express-validator')

const getAllProduct = checkSchema({
    productName: {
        isString: true,
    },
    price: {
        isFloat: true,
    },
    quantity: {
        isInt: true,
    },
    img: {
        isString: true,
        custom: (value) => {
            // console.log(value)
            if (value.includes('http://')) return true
            return false
        },
        optional: { options: { nullable: true } },
    },
    isDeleted: {
        isInt: true,
        optional: { options: { nullable: true } },
    },
    isInactived: {
        isBoolean: true,
        optional: { options: { nullable: true } },
        matches: { options: [/\b(?:1|0)\b/] },
    },
})

module.exports = getAllProduct
