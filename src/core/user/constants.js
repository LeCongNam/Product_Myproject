const { ERecord } = require('../../lib/enum/enum')

const pickUserRegister = [
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'address',
    'password',
    'phone',
    'avatar',
]

const pickUserEditProfile = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'address',
    'password',
    'phone',
    'avatar',
    'isDelete',
]

const standardUserSearch = {
    type: ERecord.user,
    results: [
        `${ERecord.user}.id`,
        `${ERecord.user}.firstName`,
        `${ERecord.user}.lastName`,
        `${ERecord.user}.email`,
        `${ERecord.user}.gender`,
        `${ERecord.user}.phone`,
        `${ERecord.user}.createdAt`,
        `${ERecord.user}.updatedAt`,
        `${ERecord.user}.isInactived`,
        `${ERecord.user}.isDeleted`,
        `${ERecord.user}.address`,
        `${ERecord.user}.role`,
        `${ERecord.user}.dob`,
        `${ERecord.user}.password`,
    ],
    filters: {
        [`${ERecord.user}.isDeleted`]: [0],
        [`${ERecord.user}.isInactived`]: [0],
    },
}

module.exports = {
    pickUserRegister,
    standardUserSearch,
    pickUserEditProfile,
}
