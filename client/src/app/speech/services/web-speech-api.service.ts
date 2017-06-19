import {Injectable, NgZone} from "@angular/core";
import {IWindow} from "../IWindow.interface";
import {Observable} from "rxjs/Observable";

@Injectable()
export class WebSpeechApiService {
  speechRecognition: any;

  constructor(private zone: NgZone) {
  }

  record(): Observable<any> {
    return Observable.create((observer) => {
      const {webkitSpeechRecognition} : IWindow = <IWindow>window;
      try {
        this.speechRecognition = new webkitSpeechRecognition();
        this.speechRecognition.lang = 'en-us';
        this.speechRecognition.continuous = true;

        this.speechRecognition.maxAlternatives = 1;
      } catch (err){
        return observer.error(err);
      }

      this.speechRecognition.onresult = (event) => {
        var last = event.results.length - 1;
        var resultText = event.results[last][0].transcript;

        this.zone.run(() => observer.next(resultText) );
      }

      this.speechRecognition.onspeechend = (event) => {
        console.log('speech end');
        console.log('end', event);
        this.zone.run(() => observer.next(null) );
      }

      this.speechRecognition.onnomatch = (event) => {
        console.log('no mathc');
        observer.next(null);
      }

      this.speechRecognition.onaudiostart = () => {
        console.log('Audio capturing started');
      }

      this.speechRecognition.onspeechstart = () => {
        console.log('Speech has been detected');
      }

      this.speechRecognition.onerror = (event) => {
        // diagnostic.textContent = 'Error occurred in this.recognition: ' + event.error;
        console.log(`Error occurred in this.recognition: ${event.error}`);
        observer.error(event.error);
      }

      this.speechRecognition.start();

    });
  }

  stopRecord(): void {
    if(this.speechRecognition){
      this.speechRecognition.stop();
    }
  }
}
