module.exports = (container) => {
    //Services
    container.add('GoogleWebSpeechService', require('../services/GoogleWebSpeechService'), []);

}
