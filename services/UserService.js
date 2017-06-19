const _ = require('lodash');

module.exports = class UserService {
    constructor(User) {
        this.User = User;
    }

    create(params) {
        return this.User.create(params);
    }

    getById(userId) {
        return this.User.findById(userId);
    }

    getByEmail(email) {
        return this.User.findOne({email: email});
    }

    getByFacebookId(id) {
        return this.User.findOne({facebookId: id});
    }

    createUserFromGoogle(params) {
        return this.create(this.getGoogleFields(params));
    }

    updateUserFromGoogle(params){
        return this.getByEmail(params.emails[0].value)
            .then((user) => {
                if (!user) {
                    return this.createUserFromGoogle(params);
                }

                _.assign(user, this.getGoogleFields(params));
                return user.save();
            });
    }

    createUserFromFacebook(params) {
        return this.create(this.getFacebookFields(params));
    }

    updateUserFromFacebook(params) {
        return this.getByFacebookId(params.id)
            .then((user) => {
                if (!user) {
                    return this.createUserFromFacebook(params)
                }

                _.assign(user, this.getFacebookFields(params))
                return user.save()
            });
    }

    getFacebookFields(params) {
        return {
            name: params.name.familyName + ' ' + params.name.givenName,
            email: params._json.email || '',
            emails: params.emails,
            facebookId: params.id,
            profileUrl: params.profileUrl,
            facebookData: params._json
        };
    }

    getGoogleFields(params) {
        return {
            name: params.displayName,
            email: params.emails[0].value,
            googleId: params.id,
            googleData: params._json
        }
    }
}
