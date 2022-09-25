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
    },
})

module.exports = getAllProduct
