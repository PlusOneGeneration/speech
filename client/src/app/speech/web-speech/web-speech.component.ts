import {Component} from '@angular/core';
import {WebSpeechApiService} from "../services/web-speech-api.service";

@Component({
  selector: 'web-speech',
  templateUrl: './web-speech.component.html'
})
export class WebSpeechComponent {
  text: string = '';

  constructor(private webSpeechApiService: WebSpeechApiService) {
  }

  start():void {
    this.webSpeechApiService
      .record()
      .subscribe(
        (resultText) => {
          if (resultText) {
            this.text = resultText;
          }
        },
        (error) => console.error(error)
      );
  }

  stop():void {
    this.webSpeechApiService.stopRecord();
  }
}
