module.exports = (app) => {
    const {Router} = require('express');
    const router = Router();

    const RecordService = app.container.get('RecordService');
    const FileUploadMulterService = app.container.get('FileUploadMulterService');

    router.post('/', FileUploadMulterService.uploadMiddleware(), (req, res, next) => {
        let record = {
            title: req.body.title,
            speechType:  req.body.speechType,
            user: req.user.userId,
            filePath: req.file.path,
            transcription: req.body.transcription || ''
        };

        RecordService.save(record)
            .then((record) => res.json(record))
            .catch((err) => next(err));
    });


    return router;
}