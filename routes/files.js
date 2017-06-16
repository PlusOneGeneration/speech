module.exports = (app) => {
    const {Router} = require('express');
    const router = Router();

    const GoogleWebSpeechService = app.container.get('GoogleWebSpeechService');
    const FileUploadMulterService = app.container.get('FileUploadMulterService');
    const RecordService = app.container.get('RecordService');

    router.get('/', (req, res, next) => {
        //TODO @@@dr remove this route
        GoogleWebSpeechService.uploadFileToSpeech('./resources/test.wav')
            .then((resultText) => {
                res.json(resultText);
            })
            .catch((err) => next(err));
    });

    router.post('/', FileUploadMulterService.uploadMiddleware(), (req, res, next) => {
        GoogleWebSpeechService.uploadFileToSpeech(req.file.path)
            .then((resultText) => res.json({transcription: resultText}))
            .catch((err) => next(err));
    });

    router.get('/:fileId', (req, res, next) => {
        RecordService.getRecordFileByFileId(req.params.fileId)
            .then((record) => {
                if (!record) {
                    return res.status(404).send();
                }

                res.header("Content-Type", "audio/wav");
                res.sendFile(record.file.filename, {root: __dirname + '/../' + record.file.destination})
            });
    });

    return router;
}
