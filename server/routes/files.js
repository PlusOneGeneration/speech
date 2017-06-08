module.exports = (app) => {
  const {Router} = require('express');
  const router = Router();

  const GoogleWebSpeechService = app.container.get('GoogleWebSpeechService');
  const FileUploadMulterService = app.container.get('FileUploadMulterService');

  router.get('/', (req, res, next) => {
    GoogleWebSpeechService.uploadFileToSpeech('./resources/test.wav')
      .then((resultText) => {
        res.json(resultText);
      })
      .catch((err) => next(err));
  });

  router.post('/',  FileUploadMulterService.uploadMiddleware(), (req, res, next) => {
    res.send(req.file);
  });

  return router;
}
