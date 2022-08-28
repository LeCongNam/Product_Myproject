const enviroment = process.env.NODE_ENV || 'developement'
const config = require('./knexfile')[enviroment]

const Knex = require('knex')(config)


module.exports  = Knex

