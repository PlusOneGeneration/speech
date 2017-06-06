import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { WebSpeechRoutingModule} from "./web-speech.routing.module";
import {RouterModule} from "@angular/router";

import { WebSpeechComponent } from './web-speech.component';
import {WebSpeechApiService} from "./services/web-speech-api.service";

@NgModule({
  declarations: [
    WebSpeechComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    WebSpeechRoutingModule
  ],
  providers: [WebSpeechApiService],
  exports: [WebSpeechComponent],
  // bootstrap: [WebSpeechComponent]
})
export class WebSpeechModule { }
