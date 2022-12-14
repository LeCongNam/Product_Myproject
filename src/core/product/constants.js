const { ERecord } = require('../../lib/enum/enum')

const standarProductSearch = {
    type: ERecord.product,
    results: [
        `${ERecord.product}.id`,
        `${ERecord.product}.productName`,
        `${ERecord.product}.price`,
        `${ERecord.product}.quantity`,
        `${ERecord.product}.img`,
        `${ERecord.product}.createdAt`,
        `${ERecord.product}.updatedAt`,
        `${ERecord.product}.isDeleted`,
        `${ERecord.product}.isInactived`,
    ],
    filters: {
        [`${ERecord.product}.isInactived`]: [0],
        [`${ERecord.product}.isDeleted`]: [0],
    },
}

module.exports = {
    standarProductSearch,
}
