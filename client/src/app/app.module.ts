import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {WebSpeechApiService} from "./speech/services/web-speech-api.service";
import {SpeechModule} from "./speech/speech.module";
import {AppRoutingModule} from "./app-routing.module";
import {AuthModule} from "./auth/auth.module";
import {LocalStorageModule} from "angular-2-local-storage";
import {UserModule} from "./user/user.module";
import {StorageService} from "./services/storage.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LocalStorageModule.withConfig({
      prefix: 'app',
      storageType: 'localStorage'
      // storageType: 'sessionStorage'
    }),
    SpeechModule,
    AuthModule,
    UserModule
  ],
  providers: [
    //TODO @@@dr check we need it or not
    WebSpeechApiService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
