import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MediaRecorderService} from "../services/media-recorder.service";

@Component({
  selector: 'web-record',
  templateUrl: './web-record.component.html'
})
export class WebRecordComponent implements AfterViewInit {

  audio: HTMLAudioElement;
  recordRTC: any;
  stream: any;

  @ViewChild('video') video;

  constructor(private mediaRecService: MediaRecorderService) {
    // Do stuff
  }

  ngAfterViewInit() {
    this.audio = this.video.nativeElement;
    this.audio.muted = false;
    this.audio.controls = true;
    this.audio.autoplay = false;
  }

  startRecording(): void {
    const recordOptions = {
      mimeType: 'audio/ogg;codecs=opus',
      audioBitsPerSecond: 128000,
      bitsPerSecond: 128000
    };

    this.mediaRecService.recordStart(recordOptions)
      .subscribe((data) => {
        this.audio.src = window.URL.createObjectURL(data.stream);
        this.stream = data.stream;
        this.recordRTC = data.recordRTC;
      });
  }

  stopRecording(): void {
    this.mediaRecService.recordStop(this.recordRTC, this.stream)
      .subscribe((audioVideoWebMURL) => {
        this.audio.src = audioVideoWebMURL;
      });
  }

  download(): void {
    this.mediaRecService.download(this.recordRTC, 'pam')
      .subscribe(() => {
        console.log('file downloaded!');
      }, (error) => console.error(error));

  }

}
