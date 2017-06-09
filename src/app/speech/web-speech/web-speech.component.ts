import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {WebSpeechApiService} from "../services/web-speech-api.service";
import {MediaRecorderService} from "../services/media-recorder.service";

import {FileUploader, FileItem} from 'ng2-file-upload';

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
  googleSpeechResult: any;

  public uploader: FileUploader = new FileUploader({url: 'http://localhost:4200/api/files'});

  @ViewChild('audio') audioElement;

  constructor(private webSpeechApiService: WebSpeechApiService,
              private mediaRecorderService: MediaRecorderService) {

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      var responsePath = JSON.parse(response);
      this.googleSpeechResult = responsePath;
    };
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

        // this.webSpeechApiService
        //   .record()
        //   .subscribe(
        //     (resultText) => {
        //       if (resultText) {
        //         this.text = resultText;
        //         this.audio.controls = true;
        //       }
        //
        //       this.stopRecording();
        //       this.isRecording = false;
        //     },
        //     (error) => console.error(error)
        //   );
      });
  }

  stop() {
    this.webSpeechApiService.stopRecord();
    this.isRecording = false;
    this.stopRecording();

    //TODO @@@dr  need to check resultText?
    this.upload(this.recordRTC.getBlob());
  }

  stopRecording(): void {
    this.mediaRecorderService.recordStop(this.recordRTC, this.stream)
      .subscribe((result) => {
        this.audio.src = result.audioVideoWebMURL;
        this.upload(this.recordRTC.getBlob());

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
