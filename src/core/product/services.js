const ERecord = require('../../lib/util/record');

class ProductService extends ERecord{
    constructor(){
        super()
    }

    hello = async()=> {
        try {
            const data = await this.createSearch({
                 type: 'tb_product',
                 results: [
                     'id'
                 ]
             })
             console.log(data);
             return data
            
        } catch (error) {
            throw error
        }
    }
}

module.exports = ProductService