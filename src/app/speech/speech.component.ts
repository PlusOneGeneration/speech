import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MediaRecorderService} from "./services/media-recorder.service";

import {FileUploader, FileItem} from 'ng2-file-upload';
import {WebSpeechComponent} from "./web-speech/web-speech.component";

@Component({
  selector: 'speech',
  templateUrl: './speech.component.html'
})
export class SpeechComponent implements OnInit, AfterViewInit {
  text: string = '';
  isRecording: boolean = false;
  audio: HTMLAudioElement;

  recordRTC: any;
  stream: any;
  googleSpeechResult: any;

  public uploader: FileUploader = new FileUploader({url: 'http://localhost:4200/api/files'});

  @ViewChild('audio') audioElement;
  @ViewChild('webSpeech') webSpeechComponent: WebSpeechComponent;

  constructor(private mediaRecorderService: MediaRecorderService) {
  }

  ngOnInit(): void {
  }

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
        this.audio.controls = true;

        this.webSpeechComponent.start();
      });
  }

  stop() {
    this.isRecording = false;
    this.webSpeechComponent.stop();
    this.stopRecording();
  }

  stopRecording(): void {
    this.mediaRecorderService.recordStop(this.recordRTC, this.stream)
      .subscribe((result) => {
        this.audio.src = result.audioVideoWebMURL;
        // this.upload(this.recordRTC.getBlob());

      });
  }

  download(): void {
    this.mediaRecorderService.download(this.recordRTC, Date.now().toString(), 'wav')
      .subscribe(() => {
        console.log('file downloaded!');
      }, (error) => console.error(error));
  }

  //TODO @@@dr move to service
  private upload(blob: Blob) {
    let file = new File([blob], 'test.wav');
    let fileItem = new FileItem(this.uploader, file, this.uploader.options);
    this.uploader.queue.push(fileItem);
    this.uploader.uploadAll();

    if (this.googleSpeechResult && this.googleSpeechResult.transcription) {

    }
  }

}
