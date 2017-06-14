import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AuthRoutingModule} from "./auth.routing.module";
import {RouterModule} from "@angular/router";

import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';
import {SignInComponent} from "./sign-in/sign-in.component";
import {TokenComponent} from "./token/token.component";
import {AuthResource} from "./auth.resource";

@NgModule({
  declarations: [
    AuthComponent,
    SignInComponent,
    TokenComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    AuthRoutingModule
  ],
  providers: [
    AuthResource,
    AuthService
  ],
  exports: [AuthComponent],
  // bootstrap: [AuthComponent]
})
export class AuthModule { }
