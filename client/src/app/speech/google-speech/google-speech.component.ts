import {Component} from '@angular/core';
import {FileUploadService} from "../../file-upload.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'google-speech',
  templateUrl: './google-speech.component.html'
})
export class GoogleSpeechComponent {
  text: string = '';
  speechResult$: BehaviorSubject<{text: string}> = new BehaviorSubject<{text: string}>(null);
  loading: boolean = false;
  speechIsSupported$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(private fileUploadService: FileUploadService) {}

  start(): void {

  }

  stop(blob: Blob): void {
    this.loading = true;
    let file = new File([blob], 'test.wav');

    this.fileUploadService.sendFile(file, 'file', '/api/files')
      .subscribe((response) => {
        this.text = response.transcription;
        this.speechResult$.next({text: this.text});

        this.loading = false;
      });
  }
}
