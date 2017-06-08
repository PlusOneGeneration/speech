import { Routes, RouterModule} from "@angular/router";
import { NgModule} from "@angular/core";
import { WebSpeechComponent} from "./web-speech.component";
import {WebRecordComponent} from "./web-record/web-record.component";
import {GoogleSpeechComponent} from "./google-speech/google-speech.component";

export const webSpeechRoutes: Routes = [
  {
    path: 'web-speech',
    component: WebSpeechComponent,
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
    RouterModule.forChild(webSpeechRoutes)
  ],
  providers: [],
  exports: [RouterModule]
})
export class WebSpeechRoutingModule { }
