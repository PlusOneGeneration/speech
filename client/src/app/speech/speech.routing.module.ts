import { Routes, RouterModule} from "@angular/router";
import { NgModule} from "@angular/core";
import { WebSpeechComponent} from "./web-speech/web-speech.component";
import {GoogleSpeechComponent} from "./google-speech/google-speech.component";
import {SpeechComponent} from "./speech.component";
import {UserCanActivate} from "../user/user.canActivate";

export const speechRoutes: Routes = [
  {
    path: 'speech',
    component: SpeechComponent,
    data: { title: 'WebSpeech' },
    // canActivate: [UserCanActivate],
    children: [
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
