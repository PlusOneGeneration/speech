import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {webSpeechRoutes} from "./web-speech/web-speech.routing.module";

const routes: Routes = [
  {path: '', redirectTo: 'app/web-speech', pathMatch: 'full'},
  {path: 'app', redirectTo: 'app/web-speech', pathMatch: 'full'},
  {
    path: 'app',
    children: [
      ...webSpeechRoutes
    ]
  },
  {path: '**', redirectTo: 'app', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
