import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {WebSpeechApiService} from "./services/web-speech-api.service";
import {MediaRecorderService} from "./services/media-recorder.service";

@Component({
  selector: 'web-speech',
  templateUrl: './web-speech.component.html'
})
export class WebSpeechComponent implements OnInit, AfterViewInit {
  text: string = '';
  isRecording: boolean = false;
  audio: HTMLAudioElement;

  recordRTC: any;
  stream: any;

  @ViewChild('audio') audioElement;

  constructor(private webSpeechApiService: WebSpeechApiService,
              private mediaRecorderService: MediaRecorderService) {
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.audio = this.audioElement.nativeElement;
  }

  start() {
    const recordOptions = {};
    this.isRecording = true;

    this.mediaRecorderService.recordStart(recordOptions)
      .subscribe((data) => {
        this.audio.src = window.URL.createObjectURL(data.stream);
        this.stream = data.stream;
        this.recordRTC = data.recordRTC;

        this.webSpeechApiService
          .record()
          .subscribe(
            (resultText) => {
              if (resultText) {
                this.text = resultText;
                this.audio.controls = true;
              }

              this.stopRecording();
              this.isRecording = false;
            },
            (error) => console.error(error)
          );
      });
  }

  stop() {
    this.webSpeechApiService.stopRecord();
    this.isRecording = false;
    this.stopRecording();
  }

  stopRecording(): void {
    this.mediaRecorderService.recordStop(this.recordRTC, this.stream)
      .subscribe((audioVideoWebMURL) => {
        this.audio.src = audioVideoWebMURL;
      });
  }

  download(): void {
    this.mediaRecorderService.download(this.recordRTC, Date.now().toString(), 'wav')
      .subscribe(() => {
        console.log('file downloaded!');
      }, (error) => console.error(error));
  }


}
