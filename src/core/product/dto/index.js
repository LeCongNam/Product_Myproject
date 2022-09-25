const saveProduct = require('./saveProductByAdmin')
const editProduct = require('./editProduct')
const getAllProductByAdminSchemas = require('./getAllProductByAdmin.output')
const getAllProductSchemas = require('./getAllProductByUser')
module.exports = {
    saveProduct,
    editProduct,
    getAllProductSchemas,
    getAllProductByAdminSchemas,
}
