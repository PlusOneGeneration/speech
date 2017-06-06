import { Routes, RouterModule} from "@angular/router";
import { NgModule} from "@angular/core";
import { WebSpeechComponent} from "./web-speech.component";

export const webSpeechRoutes: Routes = [
  {
    path: 'web-speech',
    component: WebSpeechComponent,
    data: { title: 'WebSpeech' },
    canActivate: [],
    children: [
      // {
      //   path: ':webSpeechId',
      //   component: WebSpeechComponent,
      //   resolve: {
      //     webSpeech: WebSpeechResolver
      //   }
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
