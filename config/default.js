module.exports = {
    port: 3000,
    mongo: {
        url: 'mongodb://mongo/dev'
    },
    fileStore: {
        dir: './resources/',
        fileExtension: 'wav',
    }
}
