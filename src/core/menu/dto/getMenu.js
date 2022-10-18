const { checkSchema } = require('express-validator')

const getAllProduct = checkSchema({
    categoryId: {
        isString: true,
    },
})

module.exports = getAllProduct
