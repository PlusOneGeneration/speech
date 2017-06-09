import {Component} from '@angular/core';
import * as Speech from '@google-cloud/speech';

@Component({
  selector: 'google-speech',
  templateUrl: './google-speech.component.html'
})
export class GoogleSpeechComponent {

//   start() {
//     const projectId = 'web-speech-170013';
//
// // Instantiates a client
//     const speechClient = Speech({
//       projectId: projectId
//     });
//
// // The name of the audio file to transcribe
//     const fileName = './resources/audio.raw';
//
// // The audio file's encoding, sample rate in hertz, and BCP-47 language code
//     const options = {
//       encoding: 'LINEAR16',
//       sampleRateHertz: 16000,
//       languageCode: 'en-US'
//     };
//
// // Detects speech in the audio file
//     speechClient.recognize(fileName, options)
//       .then((results) => {
//         const transcription = results[0];
//         console.log(`Transcription: ${transcription}`);
//       })
//       .catch((err) => {
//         console.error('ERROR:', err);
//       });
//   }

}
