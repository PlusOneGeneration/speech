module.exports = (app) => {
    const {Router} = require('express');
    const router = Router();
    const crypto = require('crypto');

    const RecordService = app.container.get('RecordService');
    const FileUploadMulterService = app.container.get('FileUploadMulterService');

    router.post('/', FileUploadMulterService.uploadMiddleware('tmpFile'), (req, res, next) => {
        RecordService.save(req.body, req.user, req.file)
            .then((record) => res.json(record))
            .catch((err) => next(err));
    });

    return router;
}