module.exports = class AuthService {
    constructor(TokenService, jwtConfig) {
        this.jwt = require('express-jwt');
        this.jwtConfig = jwtConfig;

        this.TokenService = TokenService;
    }

    createAuthToken(user) {
        return Promise.resolve()
            .then(() => this.TokenService.encodeAsync({userId: user.id}))
    }

    isAuthenticated() {
        return this.jwt({secret: this.jwtConfig.secret});
    }
}
