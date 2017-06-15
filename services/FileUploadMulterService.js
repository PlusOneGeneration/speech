const multer = require('multer');
const fs = require('fs');
const moment = require('moment');

module.exports = class FileUploadMulterService {

    constructor(fileStoreConf) {
        this.fileStoreConf = fileStoreConf;
    }

    getStorage() {
        let storage = multer.diskStorage({
            destination: (req, file, cb) => {
                let path = `${this.fileStoreConf.dir}/${req.user.userId}/${moment().format('YYYY-MM-DD')}`;

                fs.stat(path, (err, stats) => {
                    if (stats && stats.isDirectory()) {
                        cb(null, path)
                    } else {
                        fs.mkdir(path, 0o777, (err) => err ? cb(err) : cb(null, path));
                    }
                });
            },
            filename: (req, file, cb) => cb(null, `${this.fileStoreConf.fileNameFormat}.${this.fileStoreConf.fileExtension}`)
        });

        return storage;
    }

    getMulter() {
        return multer({storage: this.getStorage()})
    }

    uploadMiddleware(fileField = 'file') {
        let multer = this.getMulter();

        return (req, res, next) => multer.single(fileField)(req, res, next);
    }
}
