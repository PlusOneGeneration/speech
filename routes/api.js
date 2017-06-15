module.exports = (app) => {
    const {Router} = require('express');
    const router = Router();
    const AuthService = app.container.get('AuthService');

    router.use('/auth', require('./auth')(app));
    router.use('/files', AuthService.isAuthenticated(), require('./files')(app));
    router.use('/users', AuthService.isAuthenticated(), require('./users')(app));

    return router;
}
