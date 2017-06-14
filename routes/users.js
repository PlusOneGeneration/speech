module.exports = (app) => {
    const {Router} = require('express');
    const router = Router();

    // const SampleService = app.container.get('SampleService');
    const UserService = app.container.get('UserService');

    // router.param('paramId', (id, req, res, next) => {
    //    
    // });

    router.get('/', (req, res, next) => {

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