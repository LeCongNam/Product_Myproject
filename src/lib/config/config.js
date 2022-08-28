require('dotenv').config();

const database = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    port: process.env.DATABASE_PORT,
    password: process.env.DATABASE_PASSWORD,
    db_name: process.env.DATABASE_NAME,
}

console.log(database);

module.exports = database