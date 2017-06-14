module.exports = (app) => {
    const {Router} = require('express');
    const router = Router();

    const passport = require('passport');
    const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

    const UserService = app.container.get('UserService');
    const AuthService = app.container.get('AuthService');

    //TODO @@@dr move conf to file conf
    passport.use(new GoogleStrategy({
            clientID: '554942612534-i09vd6bgf5l83hht1rf13upec13haq5b.apps.googleusercontent.com',
            clientSecret: '67XR388ukMrZizQ994UBpRk3',
            callbackURL: "http://localhost:4200/api/auth/google/callback"
        },
        function (token, tokenSecret, profile, done) {
            UserService.getByEmail(profile.emails[0].value)
                .then(
                    (user) => {
                        if (!user) {
                            return UserService.createUserFromGoogle(profile)
                                .then((user) => done(null, user));
                        }

                        return done(null, user);
                    },
                    (err) => done(err));
        }));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    router.get('/google', passport.authenticate('google', {scope: 'https://www.googleapis.com/auth/userinfo.email'}));

    router.get('/google/callback',
        passport.authenticate('google', {failureRedirect: '/auth/sign-in'}),
        function (req, res) {
            if(!req.user){
                return res.send('Something went wrong');
            }

            AuthService.createAuthToken(req.user)
                .then((token) => res.redirect('/auth/token/' + token));
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