module.exports = (app) => {
  const {Router} = require('express');
  const router = Router();

  router.use('/auth', require('./auth')(app));
  router.use('/files', require('./files')(app));
  router.use('/users', require('./users')(app));

  return router;
}
