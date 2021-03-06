import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MediaRecorderService} from "./services/media-recorder.service";

import {WebSpeechComponent} from "./web-speech/web-speech.component";
import {GoogleSpeechComponent} from "./google-speech/google-speech.component";
import {Record} from "../record/Record";
import {RecordService} from "../record/record.service";
import * as DetectRTC from "detectrtc/DetectRTC.js";

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
  webRTCisSupported: boolean;
  storeFile: boolean = false;
  loading: boolean = false;
  micHasAccess: boolean = true;
  speechIsSupported: boolean = true;

  @ViewChild('audio') audioElement;
  @ViewChild('speech') speech: WebSpeechComponent | GoogleSpeechComponent | any;

  constructor(private mediaRecorderService: MediaRecorderService,
              private recordService: RecordService) {
  }

  ngOnInit(): void {
    this.webRTCisSupported = DetectRTC.isWebRTCSupported;
  }

  ngAfterViewInit() {
    this.audio = this.audioElement.nativeElement;
  }

  start() {
    const recordOptions = {};
    this.isRecording = true;
    this.isRecordFinish = false;

    this.speech.speechIsSupported$
      .subscribe((isSupported) => {
        if (!isSupported) {
          this.speechIsSupported = false;
          this.stopOnly();
        }
      });

    this.mediaRecorderService.recordStart(recordOptions)
      .subscribe(
        (data) => {
          this.audio.src = window.URL.createObjectURL(data.stream);
          this.stream = data.stream;
          this.recordRTC = data.recordRTC;
          this.audio.controls = true;
          this.micHasAccess = true;

          this.speech.start();
        },
        (error) => {
          if (error.name == 'PermissionDeniedError') {
            this.isRecording = false;
            this.micHasAccess = false;
          } else {
            console.log('err >>>', error)
          }
        }
      );
  }

  stop() {
    this.isRecording = false;

    this.mediaRecorderService.recordStop(this.recordRTC, this.stream)
      .subscribe((result) => {
        this.audio.src = result.audioVideoWebMURL;

        if (this.selectedSpeech == 'webSpeech' && this.speech instanceof WebSpeechComponent) {
          this.record.speechType = 'webSpeech';
          this.speech.stop();
        } else if (this.selectedSpeech == 'googleSpeech' && this.speech instanceof GoogleSpeechComponent) {
          this.record.speechType = 'googleSpeech';
          this.speech.stop(this.recordRTC.getBlob());
        }

        this.store(this.storeFile);
        this.isRecordFinish = true;
      });
  }

  stopOnly(): void {
    this.mediaRecorderService.recordStop(this.recordRTC, this.stream)
      .subscribe(() => {
        this.isRecordFinish = true;
        this.isRecording = false;
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
    this.micHasAccess = true;
    this.speechIsSupported = true;
  }

  store(storeFile: boolean = false): void {
    this.loading = true;

    this.speech.speechResult$
      .subscribe((speechResult) => {
        if (speechResult && speechResult.text) {
          this.record.transcription = speechResult.text;
          this.record.title = this.record.transcription || Date.now().toString();
          this.record.storeMedia = storeFile;

          if (storeFile) {
            this.record.tmpFile = new File([this.recordRTC.getBlob()], `${Date.now()}.wav`);
          }

          this.recordService.create(this.record)
            .subscribe((record) => {
              this.record = new Record;
              this.loading = false;
            });
        }
      });
  }

}
