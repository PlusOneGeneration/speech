import { Routes, RouterModule} from "@angular/router";
import { NgModule} from "@angular/core";
import { WebSpeechComponent} from "./web-speech.component";
import {WebRecordComponent} from "./web-record/web-record.component";

export const webSpeechRoutes: Routes = [
  {
    path: 'web-speech',
    component: WebRecordComponent,
    data: { title: 'WebSpeech' },
    canActivate: [],
    children: [
      {
        path: 'record',
        component: WebRecordComponent,
      }
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
