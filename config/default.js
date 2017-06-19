const moment = require('moment');

module.exports = {
    host: 'http://localhost:4200',
    port: 3000,
    mongo: {
        url: 'mongodb://mongo/dev',
    },
    fileStore: {
        dir: './resources',
        fileNameFormat: `record-${moment().format('YYYY-MM-DD HH:mm:ss')}`,
        fileExtension: 'wav',
    },
    jwtConfig: {
        secret: 'a6944J417TYMaYeEdulzD22M2srhWal1Fa5aD22M2srhWal1Fa5a6VjcwUYeEdubDbaYpnPH2j0MpE4J417TYMaWVjcwUYeEdulzD2xat0342k340'
    },
    oAuth: {
        google: {
            clientId: '554942612534-i09vd6bgf5l83hht1rf13upec13haq5b.apps.googleusercontent.com',
            secret: '67XR388ukMrZizQ994UBpRk3',
            callback: '/api/auth/google/callback'
        },
        facebook: {
            clientId: '823319997844715',
            secret: 'a227fb42a2caa2b188f5d9f6056f7c76',
            callback: '/api/auth/facebook/callback',
            profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
        }
    }
}
