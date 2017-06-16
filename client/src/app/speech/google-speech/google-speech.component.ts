import {Component} from '@angular/core';
import {FileUploadService} from "../../file-upload.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'google-speech',
  templateUrl: './google-speech.component.html'
})
export class GoogleSpeechComponent {
  text: string = '';
  text$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  loading: boolean = false;

  constructor(private fileUploadService: FileUploadService) {}

  start(): void {

  }

  stop(blob: Blob): void {
    this.loading = true;
    let file = new File([blob], 'test.wav');

    this.fileUploadService.sendFile(file, 'file', '/api/files')
      .subscribe((response) => {
        this.text = response.transcription;
        this.text$.next(response.transcription);

        this.loading = false;
      });
  }
}
