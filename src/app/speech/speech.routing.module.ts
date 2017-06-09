import { Routes, RouterModule} from "@angular/router";
import { NgModule} from "@angular/core";
import { WebSpeechComponent} from "./web-speech/web-speech.component";
import {WebRecordComponent} from "./web-record/web-record.component";
import {GoogleSpeechComponent} from "./google-speech/google-speech.component";
import {SpeechComponent} from "./speech.component";

export const speechRoutes: Routes = [
  {
    path: 'speech',
    component: SpeechComponent,
    data: { title: 'WebSpeech' },
    canActivate: [],
    children: [
      {
        path: 'record',
        component: WebRecordComponent,
      },
      // {
      //   path: 'gspeech',
      //   component: GoogleSpeechComponent,
      // }
    ]
  }
  // ,
  // { path: '',
  //   redirectTo: 'web-speech',
  //   pathMatch: 'full'
  // },
  // { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forChild(speechRoutes)
  ],
  providers: [],
  exports: [RouterModule]
})
export class WebSpeechRoutingModule { }
