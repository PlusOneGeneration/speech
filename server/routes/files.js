module.exports = (app) => {
  const {Router} = require('express');
  const router = Router();

  const GoogleWebSpeechService = app.container.get('GoogleWebSpeechService');

  router.get('/', (req, res, next) => {
    GoogleWebSpeechService.uploadFileToSpeech('./resources/test.wav')
      .then((resultText) => {
        res.json(resultText);
      })
      .catch((err) => next(err));
  });

  router.post('/', (req, res, next) => {

  });

  return router;
}
