module.exports = (app) => {
    const {Router} = require('express');
    const router = Router();

    router.use('/auth', require('./auth')(app));
    router.use('/api', require('./api')(app));

    return router;
}
