module.exports = (container) => {
    //Services
    container.add('Mongoose', require('../services/Mongoose'), ['config/mongo']);
    container.add('GoogleWebSpeechService', require('../services/GoogleWebSpeechService'), []);
    container.add('FileUploadMulterService', require('../services/FileUploadMulterService'), ['config/fileStore']);
    container.add('UserService', require('../services/UserService'), ['User']);
    container.add('TokenService', require('../services/TokenService'), ['config/jwtConfig']);
    container.add('AuthService', require('../services/AuthService'), ['TokenService']);

    //Models
    container.add('User', require('../models/User'), ['Mongoose']);

}
