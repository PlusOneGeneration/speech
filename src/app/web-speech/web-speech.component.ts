import {Component, OnInit} from '@angular/core';
import {WebSpeechApiService} from "./services/web-speech-api.service";

@Component({
  selector: 'web-speech',
  templateUrl: './web-speech.component.html'
})
export class WebSpeechComponent implements OnInit {
  text: string = '';
  isRecording: boolean = false;

  constructor(private webSpeechApiService: WebSpeechApiService) {
  }

  vocabulary: any = ['Джарвис', 'Кто твой создатель'];

  ngOnInit(): void {

  }

  start() {
    this.isRecording = true;

    this.webSpeechApiService
      .record()
      .subscribe(
        (resultText) => {
          this.text = resultText
          this.isRecording = false;
        },
        (error) => console.error(error)
      );
  }

  stop() {
    this.webSpeechApiService.stopRecord();
  }

}
