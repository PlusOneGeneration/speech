const fs = require('fs');

module.exports = class FileService {
    constructor() {
    }

    removeFile(filePath) {
        return new Promise((resolve, reject) => {
            const path = require('path');
            filePath = path.join(__dirname, '../', filePath);
            fs.unlink(filePath, (err) => err ? reject(err) : resolve());
        })
    }

    checkAndCreateDir(path) {
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
