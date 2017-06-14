import {Injectable} from "@angular/core";
import {CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable, BehaviorSubject} from "rxjs";

import { UserService } from './user.service';
import {AuthService} from "../auth/auth.service";

@Injectable()
export class UserCanActivate implements CanActivate, CanActivateChild {
  constructor(private userService:UserService, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.authService.isLoggedIn();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.canActivate(childRoute, state);
  }
}
