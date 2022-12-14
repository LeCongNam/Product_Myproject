const { validationResult } = require('express-validator')

const Validator = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return true
    }
    if (req.headers.debug === 'T') {
        res.status(400).json({
            messagCode: '400a',
            details: errors
                .array()
                .map((item) => item.param)
                .join(','),
        })
    } else {
        res.status(400).json({
            messagCode: '400a',
        })
    }

    return false
}
module.exports = Validator
