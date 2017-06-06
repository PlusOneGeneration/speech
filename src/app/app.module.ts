import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {WebSpeechComponent} from "./web-speech/web-speech.component";
import {WebSpeechApiService} from "./services/web-speech-api.service";

@NgModule({
  declarations: [
    AppComponent,
    WebSpeechComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    WebSpeechApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
