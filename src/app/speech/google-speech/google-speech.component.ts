import {Component} from '@angular/core';
import {FileUploader, FileItem} from 'ng2-file-upload';

@Component({
  selector: 'google-speech',
  templateUrl: './google-speech.component.html'
})
export class GoogleSpeechComponent {
  text: string = '';

  uploader: FileUploader = new FileUploader({url: 'http://localhost:4200/api/files'});


  constructor() {
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      var responsePath = JSON.parse(response);
      this.text = responsePath;
    };
  }

  start():void {

  }

  stop(blob: Blob):void {
    let file = new File([blob], 'test.wav');
    let fileItem = new FileItem(this.uploader, file, this.uploader.options);
    this.uploader.queue.push(fileItem);
    this.uploader.uploadAll();
  }
}
