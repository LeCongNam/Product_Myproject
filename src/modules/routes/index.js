const express = require('express')
const router = express.Router()
const multer = require('multer')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const path = 'src/public/uploads'
        cb(null, path)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-'
        const path = uniqueSuffix + file.originalname
        cb(null, path)
    },
})

const upload = multer({ storage: storage })
router.post('/upload/multiple', (req, res) => {
    upload.array('photos', 12)(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            return res.json({
                message: 'Multer upload Fail! Try again!!',
            })
        } else if (err) {
            // An unknown error occurred when uploading.
            return res.json({
                message: 'Upload Fail! Try again!!',
            })
        }

        const urls = req.files.map(
            (url) => `http://localhost:${3000}/uploads/` + url.filename
        )
        return res.json({
            message: 'upload Success',
            urls: urls,
        })
    })
})

const swaggerDocument = YAML.load(
    path.join(__dirname, '..', 'swagger', 'swagger.yaml')
)
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

module.exports = router
