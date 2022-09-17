const database = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    port: process.env.DATABASE_PORT,
    password: process.env.DATABASE_PASSWORD,
    db_name: process.env.DATABASE_NAME,
}

const PRIVATE_KEY = process.env.PRIVATE_KEY

module.exports = {
    database,
    PRIVATE_KEY,
}
