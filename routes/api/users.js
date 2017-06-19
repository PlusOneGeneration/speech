module.exports = (app) => {
    const {Router} = require('express');
    const router = Router();

    const UserService = app.container.get('UserService');
    const AuthService = app.container.get('AuthService');
    const RecordService = app.container.get('RecordService');
    const _ = require('lodash');

    router.get('/me', (req, res, next) => {
        if(!req.user && !req.user.userId){
            return res.status(401).json();
        }

        UserService.getById(req.user.userId)
            .then((user) => _.omit(user.toJSON(), ['facebookData']))
            .then((user) => res.json(user))
            .catch((err) => next(err));
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