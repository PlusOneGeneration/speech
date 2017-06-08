module.exports = (app) => {
  const {Router} = require('express');
  const router = Router();
  const multer = require('multer');
  var fs = require('fs');

  const GoogleWebSpeechService = app.container.get('GoogleWebSpeechService');

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './resources/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.wav')
    }
  })

  var upload = multer({ storage: storage })

  router.get('/', (req, res, next) => {
    GoogleWebSpeechService.uploadFileToSpeech('./resources/test.wav')
      .then((resultText) => {
        res.json(resultText);
      })
      .catch((err) => next(err));
  });

  router.post('/',  upload.single('file'), (req, res, next) => {
    res.send(req.file);
  });

  return router;
}
