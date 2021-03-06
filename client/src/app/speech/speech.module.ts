import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { WebSpeechRoutingModule} from "./speech.routing.module";
import {RouterModule} from "@angular/router";

import { WebSpeechComponent } from './web-speech/web-speech.component';
import {WebSpeechApiService} from "./services/web-speech-api.service";
import {FormsModule} from "@angular/forms";
import {MediaRecorderService} from "./services/media-recorder.service";
import {GoogleSpeechComponent} from "./google-speech/google-speech.component";
import {SpeechComponent} from "./speech.component";
import {UiModule} from "../ui/ui.module";

@NgModule({
  declarations: [
    WebSpeechComponent,
    SpeechComponent,
    GoogleSpeechComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([]),
    WebSpeechRoutingModule,
    UiModule
  ],
  providers: [
    WebSpeechApiService,
    MediaRecorderService
  ],
  exports: [WebSpeechComponent],
  // bootstrap: [WebSpeechComponent]
})
export class SpeechModule { }
