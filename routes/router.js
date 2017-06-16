module.exports = (app) => {
    const {Router} = require('express');
    const router = Router();

    router.use('/api', require('./api')(app));
    router.use('/files', require('./files')(app));

    return router;
}
