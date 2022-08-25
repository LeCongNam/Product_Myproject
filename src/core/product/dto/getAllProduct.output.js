const { checkSchema } = require('express-validator');

const getAllProduct =  checkSchema({
    id: {
      isInt: true,
    },
    name:{
        isString: true
    }
})

module.exports = getAllProduct

