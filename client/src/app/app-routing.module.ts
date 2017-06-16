import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {speechRoutes} from "./speech/speech.routing.module";
import {authRoutes} from "./auth/auth.routing.module";
import {userRoutes} from "./user/user.routing.module";
import {UserResolver} from "./user/user.resolver";
import {UserCanActivate} from "./user/user.canActivate";
import {recordRoutes} from "./record/record.routing.module";

const routes: Routes = [
  {path: '', redirectTo: 'app/speech', pathMatch: 'full'},
  {path: 'app', redirectTo: 'app/speech', pathMatch: 'full'},
  ...authRoutes,
  {
    path: 'app',
    // canActivate: [UserCanActivate],
    resolve: {
      user: UserResolver
    },
    children: [
      ...speechRoutes,
      ...userRoutes,
      ...recordRoutes
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
