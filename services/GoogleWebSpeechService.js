module.exports = class GoogleWebSpeechService {

  constructor(googleSpeechConfig) {
    this.Speech = require('@google-cloud/speech')({
        projectId: googleSpeechConfig.credentials.projectId,
        credentials: googleSpeechConfig.credentials
    });
  }

  uploadFileToSpeech(filename, encoding = 'LINEAR16', sampleRateHertz = 16000, languageCode = 'en-US') {
    const speech = this.Speech;

    const request = {
      encoding: encoding,
      sampleRateHertz: sampleRateHertz,
      languageCode: languageCode
    };

    return new Promise((resolve, reject) => {
      speech.recognize(filename, request)
        .then((results) => {
          const transcription = results[0];
          console.log(`Transcription: ${transcription}`);
          resolve(transcription);
        })
        .catch((err) => {
          console.error('ERROR:', err);
          reject(err);
        });
    })
  }
}
