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
}
