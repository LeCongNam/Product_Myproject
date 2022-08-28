require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const app = express()
require('express-async-errors');


const coreRouter = require('./core/routes');
const modulesRouter = require('./modules/routes');

if(process.env.NODE_ENV =='development'){
    app.use(morgan('dev'));
}

/*********************************************************
*                                                        *          
*                        MIDLEWARE                       *
*                                                        *      
**********************************************************/
app.use(helmet());
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(cors())

app.use('/api', coreRouter)
// app.use('/api',  modulesRouter)

app.use((err, req, res, next) => {
  // console.log("Midleware========>", err.message); //Debug
    if (err.message) {
      const mess = err.message.replace('Error:','')
      res.status(400);
      res.json({ message: mess });
    }
    next(err);
});


app.use(( req, res) => {
    if (err.message ) {
      res.status(500);
      res.json({ error: err.message|| 'Something Error!!!' });
    }
});

module.exports = app



