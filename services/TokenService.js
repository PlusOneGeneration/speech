module.exports = class TokenService {
    constructor(jwtConfig) {
        this.jwt = require('jsonwebtoken');
        console.log('jwt =>>', jwtConfig);
        this.jwtConfig = jwtConfig;
    }

    encodeAsync(data, expirationOptions = {}) {
        return new Promise((resolve, reject) => {
            this.jwt.sign(
                data,
                this.jwtConfig.secret,
                expirationOptions,
                (err, token) => err ? reject(err) : resolve(token)
            );
        });
    }

    decodeAsync(token, options = {}) {
        return new Promise((resolve, reject) => {
            this.jwt.verify(
                token,
                this.jwtConfig.secret,
                options,
                (err, data) => err ? reject(err) : resolve(data)
            );
        });
    }

    checkTokenMiddleware(options = {reqTokenField: 'Token', errorMessage: 'Wrong token'}) {
        return (req, res, next, token) => {
            this.decodeAsync(token)
                .then((token) => req[options.reqTokenField] = token)
                .then(() => next())
                .catch((err) => res.status(403).json({message: options.err}));
        }
    }
}
