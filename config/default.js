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
    googleSpeech: {
        projectId: 'web-speech-170013',
        credentials: {
            "type": "service_account",
            "project_id": "web-speech-170013",
            "private_key_id": "0ffcf9c94ebf1b58499b87f1b356e8749ed51780",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCyRbrhZXiRRq8K\nSYEyyX68Yxk96iMdFmdQHD/2aMF4qbWCggq3godP1Uyf4hE2LAE7dhhARYwhIfrF\nSBclssWnHoAKdYsv4zNfnoPIOGhmuUkX9QWx2W2nxD++N9/aDYXONmTncF9DpXJI\nVuxFT+9CswhYYxm1w04YmjpyZvPylrO10jblMTdTBYOoPgcL/3nGbdNCfvVY5XgP\naaLZKQCQhsZ9ag9mi9H9X5pvnqNhjKj0vsLO/swg7sKLyph4F5I04NqXdEwv0g4u\nWyHaivWdIdWYvROZbIF1Xyg5Jc35ENX/FnT67/JQL1ztnf7dLiqh5K8x1Mz3At5r\nO97UCYK3AgMBAAECggEAJBPmiRzu9H+Yhv1vLycGBfwMLLKInqddCyJcc3KpzNCT\nkjDdGFxLJAXntueaUhs/uJfiuocYn8/vnyNCw/dU9sg+Y198ZpmVWQGMa+W2gyt2\nNmn42BBHl88ok0ddfxSDgsMRUqE0Nk1yPl+Q+0n9AsOWqcSMfHNlB6eWsnZRYkN0\n7T95r23ozL+ffgPfFsHxPth86CFy+WSg5Xya4UnnneG/XIxTcW3qhDLH21aBnw2m\np4aR/zIKIFiyWud8egMiLy3PNTS16DLxzZjdul9csht3CTW5Ptkn901wYPGw4jvt\noV8MUqyi0SRBFmHHvgztfku28IwRLnr6mLzA4bElyQKBgQDWR0I1sQCid6Vd4RPo\n+J35oqnZCmu3swBqiToLvbUmiRGG5WVihH5Him1NLbppqjCS620j1cBG0FUKh3EG\nAevS08DErDAepbD4oXc8BhTmPGoytQfokmEu6FBy7Vx72tOyINEtYr00Grq4/nTD\n73aWOU5feZieGukfyFDfh8scYwKBgQDU+79fZgjuXbZsCyhlygOY3pLb7CxteyEs\nInaJYr0B5Dmjw7k+dkiuwOaalAODtWesPV8aVgcApWChOrAEgaTJFQmmQfi+hGsz\n/4e0vaUKFH3JNbnKrl0qbteggCahC3FG5S/XXBzJkAS0Z9udfKdHSyDpyB7PmEBn\nnCfTG3yenQKBgFG9TRx+MOfJDGQLgDTW4ixgSLpqpzykI/x/7IyeCYRxtSXoTAyQ\nzjssKxXN49Z6/ZyOAkwxNe/NeSNTF2JbSUJbVKWxqYmHW0L9FSboiwBo+3nsZN/r\nNvdV15p/wU/d4fOJYUIW8GX37FK1foVfy7Tyl1sEX5uwWE2vdGpQusJRAoGBAL7S\np83zf4EB2ZXIEXPRoZNvp6j/W3bj4P7ICehh3PI65yHBFNHP7KMWFgbdIqD5AWAi\nxHi2JyP/CCqsiFQhS+EVxkV9yj34Koy2H4Jif+IeJe0HA+WCf9qq4Orepr2XoPBi\nG5Ea6Hf3Xx+8Bdp+eum3eE+9i014Hgw2rr/IWslJAoGBAI5yHSp0Zffr29jBA7AH\ne12sySNk4yQwOV4Pzwu8cz7jaiqnAaldkJP+X9rwnddE7fVsS1YldKgR7RMinxAB\nypcxHDkmQ9fGrrHwFaqI1bkHauUV8nW0ENg1+xVGTeF7aShnRBvE58tIODTEXj0r\nKL8TiO/ijE27Fl7aMVSchCz3\n-----END PRIVATE KEY-----\n",
            "client_email": "speech@web-speech-170013.iam.gserviceaccount.com",
            "client_id": "114243690434931717521",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://accounts.google.com/o/oauth2/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/speech%40web-speech-170013.iam.gserviceaccount.com"
        }
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
