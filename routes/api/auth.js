module.exports = (app) => {
    const {Router} = require('express');
    const router = Router();

    const passport = require('passport');
    const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    const FacebookStrategy = require('passport-facebook').Strategy;

    const UserService = app.container.get('UserService');
    const AuthService = app.container.get('AuthService');
    const configOAuth = app.config.get('oAuth');
    const host = app.config.get('host');

    passport.use(new GoogleStrategy({
            clientID: configOAuth.google.clientId,
            clientSecret: configOAuth.google.secret,
            callbackURL: host + configOAuth.google.callback
        },
        function (token, tokenSecret, profile, done) {
            UserService.updateUserFromGoogle(profile)
                .then(
                    (user) => done(null, user),
                    (err) => done(err)
                );
        }));

    passport.use(new FacebookStrategy({
            clientID: configOAuth.facebook.clientId,
            clientSecret: configOAuth.facebook.secret,
            callbackURL: host + configOAuth.facebook.callback,
            profileFields: configOAuth.facebook.profileFields,
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