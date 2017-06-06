import {Component, OnInit} from '@angular/core';

import {WebSpeechApiService} from "./services/web-speech-api.service";
// import { WebSpeechService } from "./web-speech.service";
// import { WebSpeech } from "./WebSpeech";
// import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'web-speech',
  templateUrl: './web-speech.component.html'
})

export class WebSpeechComponent implements OnInit{
  title = 'WebSpeech works!';
  recognition: any;
  speechRecognitionList: any;

  constructor(private webSpeechApiService: WebSpeechApiService) {
  }

  vocabulary: any = ['Джарвис', 'Кто твой создатель'];

  ngOnInit(): void {

  }

  click() {
      // this.recognition.start();
    // console.log('this.webSpeechApiService.record()', this.webSpeechApiService.record());
    this.webSpeechApiService.record()
          .subscribe((result) => {
        console.log('record result =>>>', result);
    });

      console.log('Ready to receive a color command.');
  }

  stop() {
    console.log('stop');
    console.log('rec', this.recognition);
    this.recognition.stop();

  }

}
