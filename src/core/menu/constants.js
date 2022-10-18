const { ERecord } = require('../../lib/enum/enum')

const standardMenuSearch = {
    type: ERecord.menu,
    results: [
        `${ERecord.menu}.*`,
        `${ERecord.category}.id as cate_id`,
        `${ERecord.category}.title`,
        `${ERecord.category}.name`,
    ],
    filters: {
        [`${ERecord.menu}.isInactived`]: [0],
        [`${ERecord.menu}.isDeleted`]: [0],
    },
    leftJoins: [
        {
            table: ERecord.category,
            first: `${ERecord.menu}.categoryId`,
            second: `${ERecord.category}.id`,
        },
    ],
}

module.exports = {
    standardMenuSearch,
}
