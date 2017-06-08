module.exports = (container) => {
    //Services
    container.add('GoogleWebSpeechService', require('../services/GoogleWebSpeechService'), []);
    container.add('FileUploadMulterService', require('../services/FileUploadMulterService'), ['config/fileStore']);

}
