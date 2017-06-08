const multer = require('multer');

module.exports = class FileUploadMulterService {

  constructor(fileStoreConf) {
    this.fileStoreConf = fileStoreConf;
  }

  getStorage() {
    let storage = multer.diskStorage({
      destination: (req, file, cb) => cb(null, this.fileStoreConf.dir),
      filename: (req, file, cb) => cb(null, `${file.fieldname}- ${Date.now()}.${this.fileStoreConf.fileExtension}`)
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

  //TODO @@@dr implement it
  removeFile(){}
}
