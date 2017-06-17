const moment = require('moment');

module.exports = {
    // host: 'http://localhost:3000',
    // host: 'http://localhost:4200',
    host: 'https://plus-speech.now.sh',
    port: 3000,
    mongo: {
        // url: 'mongodb://mongo/dev'
        url: 'mongodb://remdi:remdi@ds129422.mlab.com:29422/speech-db'
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
