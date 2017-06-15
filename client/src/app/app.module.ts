import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {WebSpeechApiService} from "./speech/services/web-speech-api.service";
import {SpeechModule} from "./speech/speech.module";
import {AppRoutingModule} from "./app-routing.module";
import {AuthModule} from "./auth/auth.module";
import {LocalStorageModule} from "angular-2-local-storage";
import {UserModule} from "./user/user.module";
import {StorageService} from "./services/storage.service";
import {ResourceModule} from "ngx-resource";
import {UserTokenService} from "./user/services/user-token.service";
import {Http, RequestOptions, XHRBackend} from "@angular/http";
import {HttpService} from "./http.service";
import {RecordModule} from "./record/record.module";

export function httpUseFactory(backend: XHRBackend, defaultOptions: RequestOptions, userTokenService: UserTokenService) {
  return new HttpService(backend, defaultOptions, userTokenService);
}

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
    ResourceModule.forRoot(),
    SpeechModule,
    AuthModule,
    UserModule,
    RecordModule
  ],
  providers: [
    {
      provide: Http,
      useFactory: httpUseFactory,
      deps: [XHRBackend, RequestOptions, UserTokenService]
    },
    //TODO @@@dr check we need it or not
    WebSpeechApiService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
