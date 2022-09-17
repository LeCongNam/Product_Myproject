const { checkSchema } = require('express-validator')

const getAllProduct = checkSchema({
    id: {
        isInt: true,
        optional: { options: { nullable: true } },
    },
    name: {
        isString: true,
    },
})

module.exports = getAllProduct
