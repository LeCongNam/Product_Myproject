const transaction = async () =>
    new Promise((resolve, reject) => {
        knex.transaction((error, result) => {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    })

module.exports = {
    transaction,
}
