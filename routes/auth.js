module.exports = (app) => {
    const {Router} = require('express');
    const router = Router();

    const passport = require('passport');
    const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    const FacebookStrategy = require('passport-facebook').Strategy;

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

    passport.use(new FacebookStrategy({
            clientID: '823319997844715',
            clientSecret: 'a227fb42a2caa2b188f5d9f6056f7c76',
            callbackURL: "http://localhost:4200/api/auth/facebook/callback",
            profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified'],
        },
        function (accessToken, refreshToken, profile, done) {
            UserService.getByEmail(profile.emails[0].value)
                .then(
                    (user) => {
                        if (!user) {
                            return UserService.createUserFromFacebook(profile)
                                .then((user) => done(null, user));
                        }

                        return done(null, user);
                    },
                    (err) => done(err));
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    router.get('/google', passport.authenticate('google', {scope: 'https://www.googleapis.com/auth/userinfo.email'}));

    router.get('/google/callback',
        passport.authenticate('google', {failureRedirect: '/auth/sign-in'}),
        (req, res, next) => {
            if (!req.user) {
                return res.send('Something went wrong');
            }

            AuthService.createAuthToken(req.user)
                .then((token) => res.redirect('/auth/token/' + token));
        });

    router.get('/facebook', passport.authenticate('facebook', {scope: ['public_profile', 'email', 'user_about_me']}));

    router.get('/facebook/callback',
        passport.authenticate('facebook', {failureRedirect: '/auth/sign-in'}),
        (req, res, next) => {
            if (!req.user) {
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