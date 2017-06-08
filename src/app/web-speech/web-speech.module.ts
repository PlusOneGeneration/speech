import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { WebSpeechRoutingModule} from "./web-speech.routing.module";
import {RouterModule} from "@angular/router";

import { WebSpeechComponent } from './web-speech.component';
import {WebSpeechApiService} from "./services/web-speech-api.service";
import {FormsModule} from "@angular/forms";
import {MediaRecorderService} from "./services/media-recorder.service";
import {WebRecordComponent} from "./web-record/web-record.component";
import {GoogleSpeechComponent} from "./google-speech/google-speech.component";
import {FileUploadModule} from "ng2-file-upload";

@NgModule({
  declarations: [
    WebSpeechComponent,
    WebRecordComponent,
    GoogleSpeechComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([]),
    WebSpeechRoutingModule,
    FileUploadModule
  ],
  providers: [
    WebSpeechApiService,
    MediaRecorderService
  ],
  exports: [WebSpeechComponent],
  // bootstrap: [WebSpeechComponent]
})
export class WebSpeechModule { }
