const moment = require('moment');

module.exports = {
    host: 'http://localhost:4200',
    port: 3000,
    mongo: {
        url: 'mongodb://mongo/dev'
    },
    fileStore: {
        dir: './resources',
        fileNameFormat: `record-${moment().format('YYYY-MM-DD HH:mm:ss')}`,
        fileExtension: 'wav',
    },
    jwtConfig: {
        secret: 'a6944J417TYMaYeEdulzD22M2srhWal1Fa5aD22M2srhWal1Fa5a6VjcwUYeEdubDbaYpnPH2j0MpE4J417TYMaWVjcwUYeEdulzD2xat0342k340'
    }
}
