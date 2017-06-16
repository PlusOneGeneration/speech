module.exports = (app) => {
    const {Router} = require('express');
    const router = Router();

    const UserService = app.container.get('UserService');
    const AuthService = app.container.get('AuthService');
    const RecordService = app.container.get('RecordService');

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

    router.get('/:userId/records', (req, res, next) => {
        RecordService.getByUserId(req.user.userId, {limit: req.query.limit || 10, skip: req.query.skip || 0})
            .then((records) => res.json(records))
            .catch((err) => next(err));
    });

    router.get('/:userId/records/total', (req, res, next) => {
        RecordService.getTotalByUserId(req.user.userId)
            .then((recordsNumber) => res.json({total: recordsNumber}))
            .catch((err) => next(err));
    });

    return router;
}