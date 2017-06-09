import {Component} from '@angular/core';
import {FileUploader, FileItem} from 'ng2-file-upload';
import {environment} from '../../../environments/environment'

@Component({
  selector: 'google-speech',
  templateUrl: './google-speech.component.html'
})
export class GoogleSpeechComponent {
  text: string = '';
  loading: boolean = false;

  uploader: FileUploader = new FileUploader({url: environment.fileUploadUrl});

  constructor() {
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      var responsePath = JSON.parse(response);
      this.text = responsePath;
      this.loading = false;
    };
  }

  start():void {

  }

  stop(blob: Blob):void {
    this.loading = true;
    let file = new File([blob], 'test.wav');
    let fileItem = new FileItem(this.uploader, file, this.uploader.options);
    this.uploader.queue.push(fileItem);
    this.uploader.uploadAll();
  }
}
