import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {WebSpeechApiService} from "./speech/services/web-speech-api.service";
import {SpeechModule} from "./speech/speech.module";
import {AppRoutingModule} from "./app-routing.module";
import {AuthModule} from "./auth/auth.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SpeechModule,
    AuthModule
  ],
  providers: [
    WebSpeechApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
