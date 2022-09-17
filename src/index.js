require('dotenv').config()
const app = require('./server')

const port = process.env.PORT || 3030

app.listen(port, () => {
    if (process.env.NODE_ENV === 'development') {
        /* eslint-disable no-console */
        console.log(`Server is Running ${port}`)
    }
})
