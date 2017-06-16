module.exports = (app) => {
    const {Router} = require('express');
    const router = Router();

    const GoogleWebSpeechService = app.container.get('GoogleWebSpeechService');
    const FileUploadMulterService = app.container.get('FileUploadMulterService');
    const RecordService = app.container.get('RecordService');
    const FileService = app.container.get('FileService');

    router.post('/', FileUploadMulterService.uploadMiddleware(), (req, res, next) => {
        GoogleWebSpeechService.uploadFileToSpeech(req.file.path)
            .then((resultText) => {
                FileService.removeFile(req.file.path)
                    .then((result) => res.json({transcription: resultText}))
            })
            .catch((err) => {
                FileService.removeFile(req.file.path)
                    .then(() => next(err))
                    .catch((err) => next(err))
            });
    });

    return router;
}
