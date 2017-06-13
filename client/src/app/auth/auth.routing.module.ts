import { Routes, RouterModule} from "@angular/router";
import { NgModule} from "@angular/core";
import { AuthComponent} from "./auth.component";
import { AuthResolver} from "./auth.resolver";
import { AuthCanActivate} from "./auth.canActivate";
import {SignInComponent} from "./sign-in/sign-in.component";

export const authRoutes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    // canActivate: [AuthCanActivate],
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  providers: [AuthResolver, AuthCanActivate],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
