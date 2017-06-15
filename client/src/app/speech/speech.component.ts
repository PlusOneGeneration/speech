import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MediaRecorderService} from "./services/media-recorder.service";

import {WebSpeechComponent} from "./web-speech/web-speech.component";
import {GoogleSpeechComponent} from "./google-speech/google-speech.component";
import {Record} from "../record/Record";
import {RecordService} from "../record/record.service";
import {FileUploadService} from "../file-upload.service";

@Component({
  selector: 'speech',
  templateUrl: './speech.component.html'
})
export class SpeechComponent implements OnInit, AfterViewInit {
  isRecording: boolean = false;
  isRecordFinish: boolean = false;
  audio: HTMLAudioElement;
  selectedSpeech: string;
  recordRTC: any;
  stream: any;
  record: Record = new Record;

  @ViewChild('audio') audioElement;
  @ViewChild('speech') speech: WebSpeechComponent | GoogleSpeechComponent | any;

  constructor(private mediaRecorderService: MediaRecorderService,
              private recordService: RecordService,
              private fileUploadService: FileUploadService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.audio = this.audioElement.nativeElement;
  }

  start() {
    const recordOptions = {};
    this.isRecording = true;
    this.isRecordFinish = false;

    this.mediaRecorderService.recordStart(recordOptions)
      .subscribe((data) => {
        this.audio.src = window.URL.createObjectURL(data.stream);
        this.stream = data.stream;
        this.recordRTC = data.recordRTC;
        this.audio.controls = true;

        this.speech.start();
      });
  }

  stop() {
    this.isRecording = false;

    this.mediaRecorderService.recordStop(this.recordRTC, this.stream)
      .subscribe((result) => {
        this.audio.src = result.audioVideoWebMURL;

        if (this.selectedSpeech == 'webSpeech' && this.speech instanceof WebSpeechComponent) {
          this.speech.stop();
        } else if (this.selectedSpeech == 'googleSpeech' && this.speech instanceof GoogleSpeechComponent) {
          this.speech.stop(this.recordRTC.getBlob());
        }

        this.isRecordFinish = true;
      });
  }

  download(): void {
    this.mediaRecorderService.download(this.recordRTC, Date.now().toString(), 'wav')
      .subscribe(() => {
        console.log('file downloaded!');
      }, (error) => console.error(error));
  }

  speechChanged($event): void {
    this.isRecordFinish = false;
    this.isRecording = false;
  }

  store(): void {
    this.record.title = 'test';
    this.record.speechType = 'web';
    this.record.transcription = this.speech.text;

    // this.recordService.create(this.record)
    //   .subscribe((record) => {
    //     console.log('record =>>', record);
    //   });

    this.fileUploadService.sendFile(new File([this.recordRTC.getBlob()], 'test.wav'))
        .subscribe((record) => {
              console.log('record =>>', record);

    });


  }

}
