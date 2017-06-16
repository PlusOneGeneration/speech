import {Component} from '@angular/core';
import {WebSpeechApiService} from "../services/web-speech-api.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'web-speech',
  templateUrl: './web-speech.component.html'
})
export class WebSpeechComponent {
  text: string = '';
  text$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private webSpeechApiService: WebSpeechApiService) {
  }

  start():void {
    this.webSpeechApiService
      .record()
      .subscribe(
        (resultText) => {
          if (resultText) {
            this.text = resultText;
            this.text$.next(resultText);
          }
        },
        (error) => console.error(error)
      );
  }

  stop():void {
    this.webSpeechApiService.stopRecord();
  }
}
