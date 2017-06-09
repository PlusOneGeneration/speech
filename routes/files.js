module.exports = (app) => {
  const {Router} = require('express');
  const router = Router();

  const GoogleWebSpeechService = app.container.get('GoogleWebSpeechService');
  const FileUploadMulterService = app.container.get('FileUploadMulterService');

  router.get('/', (req, res, next) => {
    //TODO @@@dr remove this route
    GoogleWebSpeechService.uploadFileToSpeech('./resources/test.wav')
      .then((resultText) => {
        res.json(resultText);
      })
      .catch((err) => next(err));
  });

  router.post('/',  FileUploadMulterService.uploadMiddleware(), (req, res, next) => {
    GoogleWebSpeechService.uploadFileToSpeech(req.file.path)
      .then((resultText) => res.json({transcription: resultText}))
      .catch((err) => next(err));
  });

  return router;
}
