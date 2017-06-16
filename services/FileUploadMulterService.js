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
                let pathUserPath = `${this.fileStoreConf.dir}/${req.user.userId}`;
                let pathWorkingDirectory = `${this.fileStoreConf.dir}/${req.user.userId}/${moment().format('YYYY-MM-DD')}`;

                this.checkPath(pathUserPath)
                    .then((path) => this.checkPath(pathWorkingDirectory))
                    .then((path) => cb(null, path))
                    .catch((err) => cb(err));

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

    checkPath(path) {
        return new Promise((resolve, reject) => {
            fs.stat(path, (err, stats) => {
                if (stats && stats.isDirectory()) {
                    resolve(path)
                } else {
                    fs.mkdir(path, 0o777, (err) => err ? reject(err) : resolve(path));
                }
            })
        });
    }
}
