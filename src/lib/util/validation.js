const { validationResult } = require('express-validator');
const express = require('express')
const router = express.Router()

const Validator = async (req) => {
    //   await Promise.all(validations.map(validation => validation.run(req)));
  
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        return next();
      }
  
      res.status(400).json({ errors: errors.array() });
  };
module.exports = Validator