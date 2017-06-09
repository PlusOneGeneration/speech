import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {speechRoutes} from "./speech/speech.routing.module";

const routes: Routes = [
  {path: '', redirectTo: 'app/speech', pathMatch: 'full'},
  {path: 'app', redirectTo: 'app/speech', pathMatch: 'full'},
  {
    path: 'app',
    children: [
      ...speechRoutes
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
