import {Injectable} from "@angular/core";
import {IWindow} from "./IWindow.interface";
import {Observable} from "rxjs/Observable";

@Injectable()
export class WebSpeechApiService {
  speechRecognition: any;
  speechRecognitionList: any;


  constructor() {
  }

  record(): Observable<any> {
    return Observable.create((observer) => {
      const {webkitSpeechRecognition} : IWindow = <IWindow>window;
      this.speechRecognition = new webkitSpeechRecognition();
      this.speechRecognition.lang = 'ru-ru';
      // this.recognition.continuous = true;

      this.speechRecognition.maxAlternatives = 1;

      this.speechRecognition.onresult = (event) => {
        var last = event.results.length - 1;
        var resultText = event.results[last][0].transcript;
        observer.next(resultText);
      }

      this.speechRecognition.onspeechend = function (event) {
        console.log('speech end');
        console.log('end', event);
        // observer.complete();
        // this.recognition.stop();
      }

      // this.recognition.onnomatch() = (event) => {
      this.speechRecognition.onnomatch = function (event) {
        console.log('no mathc');
        observer.next(null);
      }

      this.speechRecognition.onaudiostart = function() {
        console.log('Audio capturing started');
      }

      this.speechRecognition.onspeechstart = function() {
        console.log('Speech has been detected');
      }

      this.speechRecognition.onerror = function (event) {
        // diagnostic.textContent = 'Error occurred in this.recognition: ' + event.error;
        console.log(`Error occurred in this.recognition: ${event.error}`);
        observer.error(event.error);
      }

      this.speechRecognition.start();

    });
  }
}
