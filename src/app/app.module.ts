import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {WebSpeechApiService} from "./web-speech/services/web-speech-api.service";
import {WebSpeechModule} from "./web-speech/web-speech.module";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebSpeechModule
  ],
  providers: [
    WebSpeechApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
