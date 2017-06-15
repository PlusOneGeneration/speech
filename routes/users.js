module.exports = (app) => {
    const {Router} = require('express');
    const router = Router();

    const UserService = app.container.get('UserService');
    const AuthService = app.container.get('AuthService');

    router.get('/me', (req, res, next) => {
        UserService.getById(req.user.userId)
            .then((user) => req.user = user)
            .then(() => res.json(req.user))
            .catch((err) => next(err));
    });

    router.get('/:userId', (req, res, next) => {
        UserService.getByEmail(req.params.userId)
            .then((user) => {
                if (!user) {
                    return res.status(404).send();
                }

                res.json(user);
            })
    });
    //
    // router.post('/', (req, res, next) => {
    //
    // });
    //
    // router.put('/', (req, res, next) => {
    //
    // });
    //
    // router.delete('/', (req, res, next) => {
    //
    // });

    return router;
}