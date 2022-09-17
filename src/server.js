require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
require('express-async-errors')

const coreRouter = require('./core/routes')
const modulesRouter = require('./modules/routes')

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

/** *******************************************************
 *                                                        *
 *                        MIDLEWARE                       *
 *                                                        *
 ********************************************************* */
app.enabled('trust proxy')
app.use(
    cors({
        origin: '*',
    })
)
if (process.env.NODE_ENV === 'production') {
    app.use(helmet())
}
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use('/api', coreRouter)
app.use('/api-module', modulesRouter)

app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.log('Midleware: ', err || err.message) //Debug
    if (err.message) {
        const mess = err.message.replace('Error:', '')
        res.status(400)
        res.json({ message: mess })
    }
    next(err)
})

app.use((req, res) => {
    res.status(400)
    res.json({
        messageCode: 'API not found',
    })
})

module.exports = app
