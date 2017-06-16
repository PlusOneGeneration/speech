module.exports = (app) => {
    const {Router} = require('express');
    const router = Router();

    const passport = require('passport');
    const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    const FacebookStrategy = require('passport-facebook').Strategy;

    const UserService = app.container.get('UserService');
    const AuthService = app.container.get('AuthService');
    const host = app.config.get('host');

    //TODO @@@dr move conf to file conf
    passport.use(new GoogleStrategy({
            clientID: '554942612534-i09vd6bgf5l83hht1rf13upec13haq5b.apps.googleusercontent.com',
            clientSecret: '67XR388ukMrZizQ994UBpRk3',
            callbackURL: `${host}/api/auth/google/callback`
        },
        function (token, tokenSecret, profile, done) {
            UserService.updateUserFromGoogle(profile)
                .then(
                    (user) => done(null, user),
                    (err) => done(err)
                );
        }));

    passport.use(new FacebookStrategy({
            clientID: '823319997844715',
            clientSecret: 'a227fb42a2caa2b188f5d9f6056f7c76',
            callbackURL: `${host}/api/auth/facebook/callback`,
            profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified'],
        },
        function (accessToken, refreshToken, profile, done) {
            if (profile.emails && profile.emails.length) {
                return UserService.getByEmail(profile.emails[0].value)
                    .then(
                        (user) => {
                            return UserService.updateUserFromFacebook(profile)
                                .then(
                                    (user) => done(null, user),
                                    (err) => done(err)
                                );
                        },
                        (err) => done(err));
            } else {
                return UserService.createUserFromFacebook(profile)
                    .then(
                        (user) => done(null, user),
                        (err) => done(err)
                    );
            }

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

    router.get('/facebook', passport.authenticate('facebook', {scope: ['public_profile', 'email']}));

    router.get('/facebook/callback',
        passport.authenticate('facebook', {failureRedirect: '/auth/sign-in'}),
        (req, res, next) => {
            if (!req.user) {
                return res.send('Something went wrong');
            }

            AuthService.createAuthToken(req.user)
                .then((token) => res.redirect('/auth/token/' + token));
        });

    return router;
}