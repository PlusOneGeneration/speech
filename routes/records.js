module.exports = (app) => {
    const {Router} = require('express');
    const router = Router();

    const RecordService = app.container.get('RecordService');
    const FormService = app.container.get('FormService');

    const recordForm = FormService.create(
        FormService.field('title').trim().required(),
        FormService.field('transcription').trim(),
        FormService.field('speechType').trim()
    );
    // router.param('paramId', (id, req, res, next) => {
    //    
    // });

    router.post('/', recordForm, (req, res, next) => {
        req.form.user = req.user.userId;
        RecordService.save(req.form)
            .then((record) => res.json(record))
            .catch((err) => next(err));
    });


    return router;
}