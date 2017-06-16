import { Routes, RouterModule} from "@angular/router";
import { NgModule} from "@angular/core";
import { AuthComponent} from "./auth.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {TokenComponent} from "./token/token.component";

export const authRoutes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    // canActivate: [AuthCanActivate],
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
      },
      {
        path: 'token/:token',
        component: TokenComponent,
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  providers: [],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
