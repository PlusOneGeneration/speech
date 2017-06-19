import {Component} from '@angular/core';
import {WebSpeechApiService} from "../services/web-speech-api.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'web-speech',
  templateUrl: './web-speech.component.html'
})
export class WebSpeechComponent {
  text: string = '';
  speechResult$: BehaviorSubject<{ text: string }> = new BehaviorSubject<{ text: string }>(null);
  speechIsSupported$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(private webSpeechApiService: WebSpeechApiService) {
  }

  start(): void {
    this.text = '';
    this.webSpeechApiService
      .record()
      .subscribe(
        (resultText) => {
          if (resultText) {
            this.text += resultText;
            this.speechResult$.next({text: this.text});
          }
        },
        (error) => {
          this.text = '';
          this.speechIsSupported$.next(false);
        }
      );
  }

  stop(): void {
    this.webSpeechApiService.stopRecord();
  }
}
