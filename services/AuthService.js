module.exports = class AuthService {
    constructor(TokenService) {
        this.TokenService = TokenService;
    }

    createAuthToken(user) {
        return Promise.resolve()
            .then(() => this.TokenService.encodeAsync({userId: user.id}))
    }
}
