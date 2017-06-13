module.exports = (app) => {
    const {Router} = require('express');
    const router = Router();

    const passport = require('passport');
    const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

    // const SampleService = app.container.get('SampleService');

    //TODO @@@dr move conf to file conf
    passport.use(new GoogleStrategy({
            clientID: '554942612534-i09vd6bgf5l83hht1rf13upec13haq5b.apps.googleusercontent.com',
            clientSecret: '67XR388ukMrZizQ994UBpRk3',
            callbackURL: "http://localhost:4200/api/auth/google/callback"
        },
        function (token, tokenSecret, profile, done) {
            console.log('profile +>>>>>>', profile);
            done(null, profile)
            // User.findOrCreate({googleId: profile.id}, function (err, user) {
            //     return done(err, user);
            // });
        }));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        // @@ make model instead of hash/object
        done(null, obj);
    });

    router.get('/google', passport.authenticate('google', {scope: 'https://www.googleapis.com/auth/userinfo.email'}));

    router.get('/google/callback',
        passport.authenticate('google', {failureRedirect: '/login'}),
        function (req, res) {
            console.log('USER =>>', req.user);
            res.redirect('/app/speech');
        });


    // router.param('paramId', (id, req, res, next) => {
    //    
    // });

    // router.get('/', (req, res, next) => {
    //    
    // });
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