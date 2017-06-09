module.exports = (app) => {
  const {Router} = require('express');
  const router = Router();

  router.use('/files', require('./files')(app));

  return router;
}
