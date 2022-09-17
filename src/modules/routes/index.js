const express = require('express')
// const express = require('express')
const { Router } = express
const router = Router()

const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
// const { ERole } = require('../../lib/enum/enum')
// const JWT = require('../../modules/jwt/jwt')

// constant
// const jwtService = new JWT()
const swaggerDocument = YAML.load(__dirname + '/../swagger/swagger.yaml')
router.use(
    '/docs',
    // jwtService.verifyRole([]),
    swaggerUi.serveFiles(swaggerDocument),
    swaggerUi.setup(swaggerDocument)
)

module.exports = router
