module.exports = (app) => {
    const {Router} = require('express');
    const router = Router();
    const AuthService = app.container.get('AuthService');

    router.use('/auth', require('./api/auth')(app));
    router.use('/files', AuthService.isAuthenticated(), require('./api/files')(app));
    router.use('/users', AuthService.isAuthenticated(), require('./api/users')(app));
    router.use('/records', AuthService.isAuthenticated(), require('./api/records')(app));

    return router;
}
