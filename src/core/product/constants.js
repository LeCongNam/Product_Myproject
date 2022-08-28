const { ERecord } = require('../../lib/enum/enum')

const standarProductSearch = {
    type: ERecord.product,
    results: [
        `${ERecord.product}.id`,
        `${ERecord.product}.product_name`,
        `${ERecord.product}.price`,
        `${ERecord.product}.quantity`,
        `${ERecord.product}first_name`
    ],
    filters: {
        [`${ERecord.product}.isInactived`]: [0],
        [`${ERecord.product}.isDeleted`]: [0],
    },
    pagination: { limit: 10, offset: 0 },
}



module.exports = {
    standarProductSearch
}