module.exports = class UserService {
    constructor(User) {
        this.User = User;
    }

    create(params){
        return this.User.create(params);
    }

    getById(userId) {
        return this.User.findById(userId);
    }

    getByEmail(email) {
        return this.User.findOne({email: email});
    }

    createUserFromGoogle(params) {
        let userData = {
            name: params.displayName,
            email: params.emails[0].value,
            googleId: params.id
        };

        return this.create(userData);
    }

    createUserFromFacebook(params) {
        let userData = {
            name: params.name.familyName + ' ' + params.name.givenName,
            email: params.emails[0].value,
            facebookId: params.id,
            profileUrl: params.profileUrl
        };

        return this.create(userData);
    }
}
